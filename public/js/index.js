var userdata = (localStorage.getItem("user")) || (localStorage.setItem("user", false));
var apikeydata = (localStorage.getItem("apikey")) || (localStorage.setItem("apikey", false));



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