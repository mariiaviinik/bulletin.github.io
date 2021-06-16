let base64;
let p = document.createElement("p");

$('#fileInput').change(function() {
  let file =$('#fileInput')[0].files[0];

  $("#imgShow").append(p);

  console.log();

  let reader = new FileReader();
  reader.addEventListener("load", function(e) {
    base64 = e.target.result;
    p.innerHTML = file.name + " загружено";
    console.log(base64);
  }); 
  reader.readAsDataURL(file);
});

$(".createBtn").click(function(e){
  e.preventDefault();
  postList[postList.length] = {
      "userId": curUser,
      "id": postList.length,
      "title":  $('#titleForCreate').val(),
      "category":  $('#categoryForCreate').children("option:selected").text(),
      "type":  $('#typeForCreate').children("option:selected").text(),
      "text":  $('#bodyForCreate').val(),
      "img": base64,
      "counter": 0
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


