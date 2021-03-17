function CreateApiKey() {
    
    let request = new XMLHttpRequest()
    request.open("GET", "/apikey/create?token=" + localStorage.getItem("token"));
    request.send();
    setTimeout(function() {
        let respons = request.response;
        if(respons === 'No'){
            document.getElementById("loading").style.display = 'none';
            document.getElementById("apikey").textContent = "Something went wrong unable to create an api key";
            document.getElementById("apikey2").textContent = "Refreshing in 30 seconds";
            setTimeout(function() {
                
                location.reload();
            }, 1500);
            return;
        }
        document.getElementById("loading").style.display = "none";
        document.getElementById("apikey").textContent = 'Your new Api Key is: '+ respons;
       
        
    }, 1500)

}

function DeleteApiKey(key) {
    let request = new XMLHttpRequest();
    request.open("GET", "/apikey/delete?key=" + key);
    request.send();

    setTimeout(function() {
        let respons = request.response;
        window.location.reload();

    }, 1500)
}

