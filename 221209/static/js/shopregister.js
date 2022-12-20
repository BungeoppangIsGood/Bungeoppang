/* 홈으로 가기 */
function home() {
    window.location.href = "/"
}
 /* 경도 및 위도 값 */
 const lat2 = document.querySelector(".form-control2");
 const lon2 = document.querySelector(".form-control3");
 lat2.style.display = "none";
 lon2.style.display = "none";
 /* 주소 가져오기 */
 const address = document.querySelector(".storeAddress");
 console.log(sessionStorage.getItem("shopAddress"));
 address.value = sessionStorage.getItem("shopAddress");
 /* 가게 등록하기 버튼 누르면 */
 function editStore() {
     let form = document.getElementById("form_info");
     let menu = [];
     console.log(form.operatingTime.value)
     let menuInput = document.querySelectorAll('.menu input');
     menuInput.forEach((el,i) => {
         console.log(el.value)
         if(el.value){
             menu[i] = {
                 menuName: i==0? '팥' : '슈크림',
                 price: menuInput[i].value
             }
         }
     })
     console.log(menu)
     axios({
         method: "post",
         url: "/store/register",
         data: {
             storeName: form.store.value,
             address: form.address.value,
             menu,
             operatingTime: form.operatingTime.value
         }
     }).then(function(data){{
         console.log(data)
         alert("가게 정보가 등록되었습니다:노란색_하트:")
         window.location.href = `/storeDetail?store=${data.data}`
     }})
 }
 const DST = "EPSG:900913";
 const SRC = "EPSG:4326";
 const xyz = new ol.source.XYZ({
 url: "http://mt0.google.com/vt/lyrs=m&h1=ko&x={x}&y={y}&z={z}",
 crossOrigin: "anonymous",
 });
 const view = new ol.View({
 projection: DST,
 zoom: 11,
 center: ol.proj.transform([127.0802159, 37.5383777], SRC, DST),
 constrainResolution: true,
 });
 const tileLayer = new ol.layer.Tile({ source: xyz });
 const map = new ol.Map({
 target: "map",
 layers: [tileLayer],
 view,
 controls: [],
 });
 function clickCurrentLocation() {
 navigator.geolocation.getCurrentPosition(
     (position) => {
     const lat = position.coords.latitude;
     const lon = position.coords.longitude;
     const center = ol.proj.fromLonLat([lon, lat]);
     view.animate({
         center,
         duration: 2000,
         zoom: 16,
     });
     },
     (error) => {
     alert("위치 정보를 찾을 수 없습니다.");
     },
     {

     enableHighAccuracy: true,
     maximumAge: 0,
     timeout: 5000,
     }
 );
 }
 map.addEventListener("moveend", async () => {
 const center = view.getCenter();
 const [lon, lat] = ol.proj.transform(center, DST, SRC);
 const response = await axios({
     method: "GET",
     url: "http://knsan189.iptime.org:8080/api/map/address",
     params: {
     lat,
     lon,
     },
 });
 const address = document.querySelector(".inputMap");
 console.log(response.data[0].text);
 address.value = response.data[0].text;
 });