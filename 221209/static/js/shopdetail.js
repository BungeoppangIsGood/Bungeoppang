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
        store: storeName
    }
    axios({
        method: 'post',
        url: '/store/star',
        data: data
    })
    .then(() => {
        alert("별점 남기기 성공");
        document.querySelector("#div2").style.display = "none";
    })
    .then((rating)=>{
        const row = document.getElementById("row");
        const temp = document.createElement("div");
        temp.innerHTML = `<div class="col-sm-12">
                            <div class="card">
                              <div class="card-body">
                                <h5 class="card-title sPid">${rating.User_nickName}</h5>
                                <h5 class="card-title sPuserId">${rating.user}</h5>
                                <p class="card-text sPstar"><img src="../static/img/${rating.rating}.PNG" alt=""id="starPeopleStars"></p>
                              </div>
                            </div>
                          </div>`
        row.append(temp);
})
    .then((req) => {
        let stars = document.getElementById('stars').src
        if(req.ratingAVG >= 5){
            stars.innerText= "../static/img/5.PNG"
            document.getElementById("aa").innerText = req.ratingAVG
        } else if ( 5 > req.ratingAVG >=4.5 ){
            stars.innerText= "../static/img/4.5.PNG"
            document.getElementById("aa").innerText = req.ratingAVG
        } else if ( 4.5 > req.ratingAVG >=4 ){
            stars.innerText= "../static/img/4.PNG"
            document.getElementById("aa").innerText = req.ratingAVG
        } else if ( 4 > req.ratingAVG >=3.5 ){
            stars.innerText= "../static/img/3.5.PNG"
            document.getElementById("aa").innerText = req.ratingAVG
        } else if ( 3.5 > req.ratingAVG >=3 ){
            stars.innerText= "../static/img/3.PNG"
            document.getElementById("aa").innerText = req.ratingAVG
        } else if ( 3 > req.ratingAVG >=2.5 ){
            stars.innerText= "../static/img/2.5.PNG"
            document.getElementById("aa").innerText = req.ratingAVG
        } else if ( 2.5 > req.ratingAVG >=2 ){
            stars.innerText= "../static/img/2.PNG"
            document.getElementById("aa").innerText = req.ratingAVG
        } else if ( 2 > req.ratingAVG >1.5 ){
            stars.innerText= "../static/img/1.5.PNG"
            document.getElementById("aa").innerText = req.ratingAVG
        } else if ( 1.5 > req.ratingAVG >=1 ){
            stars.innerText= "../static/img/1.PNG"
            document.getElementById("aa").innerText = req.ratingAVG
        } else if ( 1 > req.ratingAVG >=0.5 ){
            stars.innerText= "../static/img/0.5.PNG"
            document.getElementById("aa").innerText = req.ratingAVG
        } else {
            stars.innerText= "../static/img/0.PNG"
            document.getElementById("aa").innerText = req.ratingAVG
        } 
    })
}
function home() {
    window.location.href = "/map"
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