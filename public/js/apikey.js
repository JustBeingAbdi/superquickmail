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
        let apikeydiv = document.getElementById("apikeydiv");

        let new_form = document.createElement("form")
        new_form.id = respons;
        new_form.appendChild(apikeydiv);
        let newpformname = document.createElement("p")
        newpformname.textContent = respons;
        newpformname.appendChild(new_form);
        let buttonapikey = document.createElement("button");
        buttonapikey.id = respons;
        buttonapikey.textContent = 'Delete';
        buttonapikey.appendChild(new_form);
        

        buttonapikey.addEventListener("click", function(event) {
            DeleteApiKey(respons);
        });
        document.getElementById(respons).addEventListener("submit", function(event) {
            event.preventDefault();
        


       
        
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

