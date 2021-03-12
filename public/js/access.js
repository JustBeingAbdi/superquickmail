var datauser = (localStorage.getItem("user")) || (localStorage.setItem("user", false));


function CheckUser() {
    let token = localStorage.getItem("user");
    let checkuser = new XMLHttpRequest();
    checkuser.open("GET", "/users/verify/token?token=" + token);
    checkuser.send();

    setTimeout(function() {
        if(checkuser.response === 'No') return;
        window.location.assign("/");
    }, 1000);
}
CheckUser();

function Login() {
    document.getElementById("logintext").textContent = "Logging in...";
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if(!email || !password) return document.getElementById("logintext").textContent = "Fields hasn't been filled out!";
    let request = new XMLHttpRequest();
    request.open("POST", `/users/login?email=${email}&password=${password}`);
    request.send(email + ' ' + password);

    setTimeout(function() {
        let respons = request.response;
        if(respons === 'Email' || respons === "Password") return document.getElementById("logintext").textContent = "Incorrect Email or Password!";
        localStorage.setItem("user", respons);
        document.getElementById("logintext").textContent = "Logged In! Redirecting...";
        setTimeout(function() {
            window.location.assign(`/login?token=${respons}&redirect=${window.location.hostname}`);

        }, 1000);

    }, 1500)
}

let loginform = document.getElementById("loginform");
loginform.addEventListener("submit", function(event) {
    event.preventDefault();
    Login();
});
let signupform = document.getElementById("signupform");
signupform.addEventListener("submit", function(event) {
    event.preventDefault();
    Signup();
})

function Signup() {
    let name = document.getElementById("name");
    let email = document.getElementById("semail").value;
    let password = document.getElementById("spassword").value;
    if(!name || !email || !password) return document.getElementById("signuptext").textContent = "All Fields hasn't been filled out!";

    let request = new XMLHttpRequest();
    request.open("POST", `/users/signup?email=${email}&password=${password}`);
    request.send(name);

    

    setTimeout(function() {
        let responss = request.response;
        let respons = responss.split(" ");
        if(responss === 'Email') return document.getElementById("signuptext").textContent = "The Email is already used in another account!";
        localStorage.setItem("user", respons[0]);
        let verification = new XMLHttpRequest();
        verification.open("POST", `/api/email/html/send`);
        let data = {
            from: "SuperQuickMail",
            to: email,
            subject: "Verification",
            message: `<a href="https://${window.location.hostname}/verify?key=${respons[1]}">Reset Password </a>`
        };
        verification.send(JSON.stringify(data));
        setTimeout(function() {
            console.log(verification.response)
        window.location.assign(`/login?token=${respons}&redirect=${window.location.hostname}`);
        }, 2000)
       
    }, 1500)
}
