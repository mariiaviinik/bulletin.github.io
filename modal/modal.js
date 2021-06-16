$(".signBtn").click(function(e){
    e.preventDefault();
    let curUsername = $('#username').val();
    let curPass = $('#pass').val();
    let res = false;
    // let id;
    usersList.forEach(function(user){
        console.log(!(user.username === null));
        if(!(user.username === null)){
            if(user.username === curUsername && user.password === curPass){
                localStorage.setItem('curUser', user.id)
                // console.log(curUsername);
                // $('#holder').toggle("hide");
                alert("Вітаю вас :)");
                res = true;
                document.location.href = "../index.html";
            }
        }
    });
    if(!res){
        alert("Нажаль, ви ще не зареєстровані або дані введені невірно :(");
    }
});
