$(".signBtn").click(function(e){
    e.preventDefault();
    let curUsername = $('#username').val();
    let curPass = $('#pass').val();
    let res = false;
    // let id;
    for(data of usersList){
    // usersList.forEach(function(user){
        if(data){
            if(data.username === curUsername && data.password === curPass){
                localStorage.setItem('curUser', data.id)
                // console.log(curUsername);
                // $('#holder').toggle("hide");
                alert("Вітаю вас :)");
                res = true;
                document.location.href = "../index.html";
            }
        }
    }
    if(!res){
        alert("Нажаль, ви ще не зареєстровані або дані введені невірно :(");
    }
});
