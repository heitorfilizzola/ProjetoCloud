document.getElementById("Login_Button").addEventListener("click", function () {

    let user = document.getElementById("Username_Input").value;
    let pass = document.getElementById("Password_Input").value;


    if(user.trim() == "user" && pass.trim() == "123"){

        window.location.replace("http://www.w3schools.com");
        console.log("Login Efetuado");


    }


});