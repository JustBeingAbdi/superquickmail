let urlpara = new URLSearchParams(window.location.search);

let token = urlpara.get("key");
let host = urlpara.get("host");
let redirect = urlpara.get("redirect");



if(host === "<%= config.appurl %>".replace("https://", "").replace("/", "")){

    localStorage.setItem("token", false);
    if(!redirect){
    window.location.assign(`<%= config.apiurl %>/logout?key=${token}&redirect=<%= config.appurl %>&host=<%= config.apiurl %>`);
    } else {
        window.location.assign("<%= config.apiurl %>/?message=logged_out");
    }
}

if(host === "<%= config.apiurl %>".replace("https://", "").replace("/", "")){

    localStorage.setItem("user", false);
    if(!redirect){
    window.location.assign(`<%= config.appurl %>/logout?key=${token}&redirect=<%= config.apiurl %>&host=<%= config.appurl %>`);
    } else {
        window.location.assign("/?message=logged_out");
    }
}
