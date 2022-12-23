function stars() {
    let starPeople = document.getElementById("starPeople");
    if (starPeople.style.display == "none") {
        starPeople.style.display = "block";
    } else { 
        starPeople.style.display = "none";
    }
}
stars();
function starPeopleClose(){
    let starPeople = document.getElementById("starPeople");
    starPeople.style.display = "none";
}
starPeopleClose();
function recordStar() {
    let button = document.querySelectorAll("button")[1];
    
    button.addEventListener("click", function(){
        let content = document.querySelector("#div2");
        if (content.style.display == "none") {
            content.style.display = "block";
            button.style.backgroundColor = "#F7D358"
        } else { 
            content.style.display = "none";
            button.style.backgroundColor = "#FFBF00";
        }
    })
}
recordStar();
function regiStarClose() {
    let button = document.querySelectorAll("button")[1];
    let content = document.querySelector("#div2");
    content.style.display = "none";
    button.style.backgroundColor = "#FFBF00"
}
regiStarClose();
/* 1. regiStar 버튼을 누르면  */
let cnt = 0;
function regiStar() {
    cnt++;
    let form = document.getElementById("form_star");
    const storeName = document.querySelector("#storeName").innerText;
    let data = {
        rating: form.rating.value,
        store: storeName,
        
    }
    axios({
        method: 'post',
        url: '/store/star',
        data: data
    })
    .then((req) => {
        //alert("별점 남기기 성공");
        document.querySelector("#div2").style.display = "none";


        console.log(req);
        const row = document.querySelector(".row");
        const temp = document.createElement("div");
        temp.innerHTML = `<div class="col-sm-12">
                            <div class="card">
                              <div class="card-body">
                                <h5 class="card-title sPid">${req.data.nickName}</h5>
                               <p class="card-text sPstar"><img src="/static/img/${req.data.rating}.png" alt=""id="starPeopleStars"></p>
                              </div>
                            </div>
                          </div>`
        row.append(temp);



        let stars = document.getElementById('stars');
        req.data.ratingAVG = Number(req.data.ratingAVG)
        console.log(req.data.ratingAVG, typeof req.data.ratingAVG)

        stars.src = `static/img/${Math.round(req.data.ratingAVG)}.png`
        document.getElementById("aa").innerText = req.data.ratingAVG
    })
    
}
function home() {
    window.location.href = "/map"
}
function edit(a){
    console.log(a)
    window.location.href = `/storeEdit?store=${a}`
}
const address = document.querySelector(".form-control");
const lat2 = document.querySelector(".form-control2");
const lon2 = document.querySelector(".form-control3");
lat2.style.display = "none";
lon2.style.display = "none";
console.log(sessionStorage.getItem("shopAddress"));
console.log(sessionStorage.getItem("shopLat"));
console.log(sessionStorage.getItem("shopLon"));
address.value = sessionStorage.getItem("shopAddress");
lat2.value = sessionStorage.getItem("shopLat");
lon2.value =  sessionStorage.getItem("shopLon");