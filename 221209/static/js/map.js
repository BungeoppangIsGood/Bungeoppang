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

// 역 검색하기 a

let places;
const searchBox = document.getElementById("searchBox");
searchBox.addEventListener("submit", search);

function fromLonLat(lon, lat) {
  return ol.proj.fromLonLat([lon, lat]);
}

async function search() {
  event.preventDefault();
  const response = await axios({
    method: "GET",
    url: "http://knsan189.iptime.org:3003/api/map/search",
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

// 가게 정보 화면에 노출시키기

let markerStorage = [];

function drawMarker(store) {
  const position = fromLonLat(store.longitude, store.latitude);
  const div = document.createElement("div");
  div.innerHTML = `<div class="marker"  onclick="clickMarker('${store.id}')"><img style="  width: 32px; height: 32px" src="/static/img/mapMarker.png"></div>`;
  const overlay = new ol.Overlay({
    position,
    positioning: "center-center",
    element: div,
  });
  map.addOverlay(overlay);
  const marker = { id: store.id, overlay };
  markerStorage.push(marker);
}

async function getStoreList() {
  const [x1, y1, x2, y2] = view.calculateExtent(map.getSize());
  const southWest = ol.proj.transform([x1, y1], DST, SRC);
  const northEast = ol.proj.transform([x2, y2], DST, SRC);
  const response = await axios({
    method: "POST",
    url: "/storeList",

    data: {
      southWest: { lon: southWest[0], lat: southWest[1] },
      northEast: { lon: northEast[0], lat: northEast[1] },
    },
  });
  return response.data;
}

async function drawStores() {
  const storeList = await getStoreList();

  // 첫번째 검사
  storeList.forEach((store) => {
    if (markerStorage.every((marker) => marker.id !== store.id)) {
      drawMarker(store);
    }
  });

  markerStorage.forEach((marker) => {
    if (storeList.every((store) => store.id !== marker.id)) {
      map.removeOverlay(marker.overlay);
      markerStorage = markerStorage.filter((m) => m.id !== marker.id);
    }
  });
}

map.addEventListener("moveend", drawStores);

function clickMove(i) {
  const center = ol.proj.fromLonLat([places[i].point.x, places[i].point.y]);
  view.animate({ center, duration: 2000, zoom: 16 });
}

// 가게 상세페이지로 이동하기 (임시)
function clickMarker(store) {
  location.href = `/storeDetail?store=${store}`;
}

// 내 위치로 이동하기

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

// 지도 밑에 버튼

function home() {
  location.href = "/map";
}

function registration() {
  location.href = "/storeMap";
}

function myPage() {
  location.href = "/mypage";
}

function logOut() {
  const con = confirm("로그아웃 하시겠습니까?")
  if (con === true) {
      location.href = "/auth/logout";
      alert("로그아웃 성공");
  }
}
