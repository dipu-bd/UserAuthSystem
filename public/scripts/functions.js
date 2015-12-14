function showInfo(msg) {
    var response = document.getElementById('response');
    response.innerText = msg;
    response.className = "info";
}

function showError(msg) {
    var response = document.getElementById('response');
    response.innerText = msg;
    response.className = "error";
}

function validateLogin() {
    var username = document.forms["login"]["username"].value;
    if (username == null || username == "") {
        showError("Name must be filled out");
        return false;
    }
}

function checkEmail(email) {
    var pattern = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;
    console.log(pattern.test(email));
    return pattern.test(email);
}

function validateRegister() {
    var username = document.forms["register"]["username"].value;
    var email = document.forms["register"]["email"].value;
    var password = document.forms["register"]["password"].value;
    var password2 = document.forms["register"]["password2"].value;
    if (username == null || username == "") {
        showError("Name must be filled out");
        return false;
    }
    if (!checkEmail(email)) {
        showError("Email is not valid.");
        return false;
    }
    if (password != password2) {
        showError("Entered passwords did not match with each other");
        return false;
    }
}
