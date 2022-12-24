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
    // axios({
    //     method: "delete",
    //     url: "/auth/logout",
    // }).then((data) => {
    //     if(data === true) {
    //         document.location.href = "/auth/delete";
    //     } else {
    //         alert("알 수 없는 오류 입니다");
    //     }
    // });
}

function back() {
    location.href = "/";
}