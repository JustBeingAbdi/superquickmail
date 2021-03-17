var userdata = (localStorage.getItem("user")) || (localStorage.setItem("user", false));



function CheckUser() {
    let user = localStorage.getItem("user");
    let loggedin = document.getElementById("loggedin");
    loggedin.style.visibility = "hidden";
    
    if(user === 'false') return;
    let request = new XMLHttpRequest();
    request.open("GET", `/users/verify/token?token=${user}`);
    request.send();

    setTimeout(function() {
        if(request.response === 'No') return console.log("User is not logged in")

        let notloggedin = document.getElementById("notloggedin");
        notloggedin.style.visibility = "hidden";
        document.getElementById("loggedin").style.visibility = "visible";

document.getElementById("app").href = `/app?redirect=app&token=${localStorage.getItem("user")}`;
document.getElementById("account").href = `/app?redirect=account&token=${localStorage.getItem("user")}`;
document.getElementById("logout").href = `/logout?key=${localStorage.getItem("user")}&host=https://${window.location.hostname}`;
        
    }, 1500);
    

    
}
CheckUser();