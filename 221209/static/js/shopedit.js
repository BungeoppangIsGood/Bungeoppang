/* 가게 수정하기 버튼으르 누르면 */
function editStore(a) {
    console.log(a)
    let form = document.getElementById("form_info");
    if ( !form.checkValidity() ) {
        form.reportValidity();
        return false;
     }

    let menu = [];

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
    console.log(form.lat.value)
    axios({
        method: "patch",
        url: "/store/Edit",
        data: {
            beforeStoreName: a,
            storeName: form.store.value,
            address: form.address.value,
            menu,
            operatingTime: form.operatingTime.value,
            lat: form.lat.value,
            lon: form.lon.value
        }
    }).then(function(data){{
        alert("가게 정보가 수정되었습니다💛")
        console.log(data)
        window.location.href = `/storeDetail?store=${data.data}`
    }})
}
function home() {
    window.location.href = "/map"
}

/* 경도 및 위도 값 */
const lat2 = document.querySelector(".form-control2");
const lon2 = document.querySelector(".form-control3");
lat2.style.display = "none";
lon2.style.display = "none";

/* 가게 주소 설정 스크립트 */
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

let count = 1
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
document.querySelector('.lat').value = lat
document.querySelector('.lon').value = lon
console.log(response.data[0].text);
if(count != 1) address.value = response.data[0].text;

count++;
});


