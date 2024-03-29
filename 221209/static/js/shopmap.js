const DST = "EPSG:900913";
const SRC = "EPSG:4326";
const xyz = new ol.source.XYZ({
  url: "http://mt0.google.com/vt/lyrs=m&h1=ko&x={x}&y={y}&z={z}",
  crossOrigin: "anonymous",
});
let lat2 = 0;
let lon2 = 0;

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
    url: "http://knsan189.iptime.org:3003/api/map/address",
    params: {
      lat,
      lon,
    },
  });
  const address = document.querySelector(".form-control");
  address.value = response.data[0].text;
  lat2 = response.config.params.lat;
  lon2 = response.config.params.lon;
  console.log(lat2, lon2)
});

function goRegister() {
  // 이름 수정
  const address = document.querySelector(".form-control");
  sessionStorage.setItem("shopAddress", address.value);
  sessionStorage.setItem("shopLat", lat2);
  sessionStorage.setItem("shopLon", lon2);
  location.href = "/storeRegister";
}

function closes() {
  location.href = "/map";
}
