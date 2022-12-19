const DST = "EPSG:900913";
const SRC = "EPSG:4326";
const xyz = new ol.source.XYZ({
  url: "http://mt0.google.com/vt/lyrs=m&h1=ko&x={x}&y={y}&z={z}",
  crossOrigin: "anonymous",
});
const lat2 = document.querySelector(".form-control2");
const lon2 = document.querySelector(".form-control3");
lat2.style.display = "none";
lon2.style.display = "none";

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
  const address = document.querySelector(".form-control");
  const lat2 = document.querySelector(".form-control2");
  const lon2 = document.querySelector(".form-control3");
  address.value = response.data[0].text;
  lat2.value = response.config.params.lat;
  lon2.value = response.config.params.lon;
});

function test() {
  // 이름 수정
  const address = document.querySelector(".form-control");
  const lat2 = document.querySelector(".form-control2");
  const lon2 = document.querySelector(".form-control3");
  sessionStorage.setItem("shopAddress", address.value);

  sessionStorage.setItem("shopLat", lat2.value);
  sessionStorage.setItem("shopLon", lon2.value);
  location.href = "/storeRegister";
}
