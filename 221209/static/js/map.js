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

let places;

const searchBox = document.getElementById("searchBox");
searchBox.addEventListener("submit", search);
async function search() {
  event.preventDefault();
  const response = await axios({
    method: "GET",
    url: "http://knsan189.iptime.org:8080/api/map/search",
    params: {
      keyword: searchBox.keyword.value,
    },
  });

  const resultBox = document.querySelector(".resultBox");
  places = response.data;

  resultBox.innerHTML = "";
  for (let i = 0; i < places.length; i++) {
    resultBox.innerHTML += `<div onclick="clickMove(${i})" data-bs-dismiss="modal" aria-label="Close" class="px-3 py-2"><p class="fs-5 m-0" >${places[i].title}</p><p class="m-0 fs-6">${places[i].address.road}</p></div><hr>`;
  }
}

function clickMove(i) {
  const center = ol.proj.fromLonLat([places[i].point.x, places[i].point.y]);
  view.animate({
    center,
    duration: 2000,
    zoom: 16,
  });
}

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

function home() {
  location.href = "/map";
}

function registration() {
  location.href = "/shopmap";
}

function myPage() {
  location.href = "/mypage";
}

function logOut() {
  console.log("로그아웃");
}
