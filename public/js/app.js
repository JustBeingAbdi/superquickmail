var userdata = (localStorage.getItem("token")) || (localStorage.setItem("token", false));
var suserdata = (sessionStorage.getItem("key")) || (sessionStorage.setItem("key", 'Not Logged in'));

function CreateApiKey() {
    window.location.assign("/manage/account/api/management?token=" + localStorage.getItem("token"));
}


function CheckUser() {
    let user = localStorage.getItem("token");
    
    
    if(user === 'false') return window.location.assign("/api");
    let request = new XMLHttpRequest();
    request.open("GET", `/users/verify/token?token=${user}`);
    request.send();

    setTimeout(function() {
        if(request.response === 'No') return window.location.assign("/api");
        document.getElementById("logout").href = `/logout?key=${localStorage.getItem("token")}&host=https://${window.location.hostname}`;
    }, 1500);

}


CheckUser();
