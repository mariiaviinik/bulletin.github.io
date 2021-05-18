$(".signBtn").click(function(e){
    e.preventDefault();
    // console.log($(".signBtn"));
    let curUsername = $('#username').val();
    let curPass = $('#pass').val();
    let res = false;
    // let id;
    usersList.forEach(function(user){
        if(user.username === curUsername && user.password === curPass){
            localStorage.setItem('curUser', user.id)
            // console.log(curUser);
            // $('#holder').toggle("hide");
            alert("Вітаю вас :)");
            res = true;
            document.location.href = "../index.html";
        }
    });
    if(!res){
        alert("Нажаль, ви ще не зареєстровані або дані введені невірно :(");
    }
});
