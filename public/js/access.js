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
        let vhtml = `https://${window.location.hostname}/manage/account/verify?key=${respons[1]}`
        let emailhtml = `<h2>Verify Account</h2>\n\n<p>To contiue using our services after 72 hours, you have to verify your account.</p>\n<p>Click the Link below to verify</p>\n\n<a href="${vhtml}">Verify Email</a>\n\n\nSincerly SuperQuickMail\n\n<p>if your unable to click the link above manually copy and paste this link into a browser ${vhtml}`;
        verification.open("GET", `/api/email/html/send?to=${email}&from=SuperQuickMail&subject=Verify%20Account&body=${emailhtml}`);
        verification.send();
        setTimeout(function() {
            console.log(verification.response)
        window.location.assign(`/login?token=${respons}&redirect=${window.location.hostname}`);
        }, 2000)
       
    }, 1500)
}
