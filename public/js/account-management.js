function Reset() {
    let email = document.getElementById("remail").value;
    if(!email) return document.getElementById("resettext").textContent = "Please Enter the Email!";

    let request = new XMLHttpRequest();
    request.open("POST", `/users/manage/reset-password?email=${email}`);
    request.send();

    setTimeout(function() {
        let respons = request.response;
        if(respons === 'Email') return document.getElementById("resettext").textContent = "This Email doesn't belong to any accounts!";

        document.getElementById("resettext").textContent = "Email has been sent! Please Check your email for any Reset Password emails."
    }, 1500)
}