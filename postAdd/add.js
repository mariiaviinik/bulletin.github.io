$(".createBtn").click(function(e){
  e.preventDefault();
  postList[postList.length] = {
      "userId": curUser,
      "id": postList.length,
      "title":  $('#titleForCreate').val(),
      "category":  $('#categoryForCreate').children("option:selected").text(),
      "type":  $('#typeForCreate').children("option:selected").text(),
      "text":  $('#bodyForCreate').val()
  };
  $('#titleForCreate').val("");
  $('#bodyForCreate').val("")
  let jsonDt = JSON.stringify(postList);
  postData(urlPosts, jsonDt)
  .then((data) => {
    console.log(data); // JSON data parsed by `response.json()` call
  });
  alert("Оголошення створено :)");
  document.location.href = "../index.html";
});