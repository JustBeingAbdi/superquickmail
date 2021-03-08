

var userdata = (localStorage.getItem("user")) || (localStorage.setItem("user", false));
var apikeydata = (localStorage.getItem("apikey")) || (localStorage.setItem("apikey", false));


function CreateApiKey() {
    document.getElementById("apikey").textContent = "Creating...";
    if(userdata !== 'false' || apikeydata !== 'false') return;

    let request = new XMLHttpRequest();
    request.open("GET", "/apikey/create");
    request.send();
    setTimeout(function() {
        let responss = request.response
        let respons = responss.split(" ");
        localStorage.setItem("apikey", respons[0]);
        localStorage.setItem("user", respons[1]);
        document.getElementById("apikey").textContent = `Your Api Key is: ${respons[0]}`;
        let button = document.getElementById("apikeybutton");
        button.style.visibility = "hidden";
    }, 1500)
    
}