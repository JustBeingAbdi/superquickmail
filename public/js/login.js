var token = (localStorage.getItem("token")) || (localStorage.setItem("token", false));

function Login() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const redirect = urlParams.get("redirect").replace("login", "");
    localStorage.setItem("token", token);
    window.location.assign('https://' + redirect)
}