var userdata = (localStorage.getItem("user")) || (localStorage.setItem("user", false));
var apikeydata = (localStorage.getItem("apikey")) || (localStorage.setItem("apikey", false));
var cookiedata = (localStorage.getItem("cookies")) || (localStorage.setItem("cookies", false));



function CheckUser() {
    let user = localStorage.getItem("user");
    let button = document.getElementById("apikeybutton");
    if(user === 'false') return;
    let request = new XMLHttpRequest();
    request.open("GET", `/users/verify/token?token=${user}`);
    request.send();

    setTimeout(function() {
        if(request.response === 'No') return;

        button.style.visibility = "hidden";
        document.getElementById("apikey").textContent = `Your Api Key is: ${localStorage.getItem("apikey")}`;
        
    }, 1500)

    
}
CheckUser();






function CheckCookie() {
    let urlParams = new URLSearchParams(window.location.search);
    let cookiesscan = urlParams.get("cookies");
    if(cookiesscan === 'true'){
        return localStorage.setItem("cookies", true);

    };
    if(localStorage.getItem("cookies") === 'false'){
        return window.location.assign("https://cookies.superquickemail.cf");
    };

    
}
CheckCookie();
