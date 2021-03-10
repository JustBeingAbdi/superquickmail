var userdata = (localStorage.getItem("user")) || (localStorage.setItem("user", false));


function CheckUser() {
    let user = localStorage.getItem("user");
    let loggedin11 = document.getElementById("headerloggedin");
    loggedin11.style.visibility = "hidden";
    
    if(user === 'false') return;
    let request = new XMLHttpRequest();
    request.open("GET", `/users/verify/header/token?token=${user}`);
    request.send();

    setTimeout(function() {
        if(request.response === 'No') return;
        document.getElementById("app1").href = `/app?redirect=app&token=${localStorage.getItem("user")}`;
        document.getElementById("account1").href = `/app?redirect=account&token=${localStorage.getItem("user")}`;
        loggedin11.style.visibility = "visible";
        document.getElementById("headerlogin").style.display = "none";
        


        
        
    }, 1500)

    
}
CheckUser();