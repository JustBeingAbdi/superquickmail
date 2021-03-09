var userdata = (localStorage.getItem("user")) || (localStorage.setItem("user", false));

function CreateApiKey() {
    window.location.assign("/manage/account/api/management");
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