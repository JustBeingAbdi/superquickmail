var userdata = (localStorage.getItem("user")) || (localStorage.setItem("user", false));

document.getElementById("app").href = `/app?redirect=app&token=${localStorage.getItem("user")}`;
document.getElementById("account")

function CheckUser() {
    let user = localStorage.getItem("user");
    let loggedin = document.getElementById("loggedin");
    loggedin.style.visibility = "hidden";
    
    if(user === 'false') return;
    let request = new XMLHttpRequest();
    request.open("GET", `/users/verify/token?token=${user}`);
    request.send();

    setTimeout(function() {
        if(request.response === 'No') return;

        let notloggedin = document.getElementById("loggedin");
        notloggedin.style.visibility = "hidden";
        loggedin.visibility = 'visable'
        
    }, 1500)

    
}
CheckUser();