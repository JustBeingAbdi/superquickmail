
var token = '<%= token %>';
localStorage.setItem("user", token);

window.location.assign(`/login?token=${token}&redirect=${window.location.hostname}`);