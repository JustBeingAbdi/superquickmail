var userdata = (localStorage.getItem("token")) || (localStorage.setItem("token", false));

function CreateApiKey() {
    window.location.assign("/manage/account/api/management?token=" + localStorage.getItem("token"));
}


function CheckUser() {
    let user = localStorage.getItem("user");
    
    
    if(user === 'false') return;
    let request = new XMLHttpRequest();
    request.open("GET", `/users/verify/token?token=${user}`);
    request.send();

    setTimeout(function() {
        if(request.response === 'No') return window.location.assign("/api");
        
    }, 1500);

}