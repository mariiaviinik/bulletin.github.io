$(".registrBtn").click(function(e){
    e.preventDefault();
    let id = usersList.length + 1;
    usersList[usersList.length] = {
        "id": id,
        "name": $('#name').val(),
        "username": $('#username').val(),
        "password": $('#pass').val(),
        "email": $('#email').val(),
        "phone": $('#phone').val(),
        "city": $('#city').val(),
    };
    $('#titleForCreate').val("");
    $('#bodyForCreate').val("")
    let jsonDt = JSON.stringify(usersList);
    postData(urlUsers, jsonDt)
    .then((data) => {
      console.log(data); // JSON data parsed by `response.json()` call
    });
    alert("Тепер ви зареєстровані :)");
    document.location.href = "../index.html";
});