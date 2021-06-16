let postList = [];
let usersList = [];
// let urlPosts = 'https://test1-c5fc6-default-rtdb.firebaseio.com/0/db.json';
// let urlUsers = 'https://test1-c5fc6-default-rtdb.firebaseio.com/1/users.json';
let urlPosts = 'https://database-dbbe2-default-rtdb.europe-west1.firebasedatabase.app/0/db.json';
let urlUsers = 'https://database-dbbe2-default-rtdb.europe-west1.firebasedatabase.app/1/users.json';
let filterArr = [];
let curUser = localStorage.getItem('curUser');


if(curUser){
  $('.holder').toggle("hide");
}

function status(response) {
  //Check Promise
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  //Return JSON format
  return response.json()
}


function getUsers(){
  fetch(urlUsers)
    .then(status)
      .then(json)
        .then(function(dataList){
          usersList = Array.from(Object.values(dataList)); 
          usersList.forEach(function(data){
            if(data){
              $('#users').append($('<option>', { 
                value: data.id,
                text : data.name 
              }));
            }
          });
          getPosts("");
        })
  .catch(function(error) {
    console.log('Fetch User Error :-S', error);
  });
}

function getPosts(arr){  
  fetch(urlPosts)
  .then(status)
  .then(json)
  .then(function(dataList) {  
    postList = Array.from(Object.values(dataList));
    makePosts(arr, dataList);
  })
  .catch(function(error) {
    console.log('Fetch Post Error :-S', error);
  });
}

function makePosts(arr, db){
  let divReply = $(".reply")
    divReply.empty();
    db = db.filter( obj => {
      if(obj[arr[0]] == arr[1] && obj[arr[2]] == arr[3] && obj[arr[4]] == arr[5]) {
        return obj;
      }
    });
    
    db.forEach(function(data){
      let post = $('<p class="post shadow "/>');
      let describeDiv = $('<div class="column bottomLine"/>');
      let titleContainer = $('<div class="menu title s-between m-t-15 m-b-15"/>');
      let contentDiv = $('<div/>');
      let lastDiv = $('<div class="floatImg" style="margin: 10px;" />');

      let titleDiv = $('<div class=""/>').append(data.title);
      let removeDiv = $('<div class="hover" id="delete"/>').append('✖').append($('<div class="hide" id="postId"/>').append(data.id));
      removeDiv.append($('<div class="hide" id="userId"/>').append(data.userId));
      let categoryDiv = $('<div class="category"/>').append('Категорія: ', data.category);
      let typeDiv =  $('<div class="type"/>').append('Тип: ', data.type); 
      let cityDiv = $('<div class="city"/>').append('Місто: ', usersList[data.userId - 1].city); 
      let textDiv = $('<div class="body" style="align: top;" />').append(data.text);
      let imgDiv = document.createElement("img");
      imgDiv.src = data.img;
      if( data.img != undefined){
        contentDiv.append(imgDiv);
      }
      let showBtn = $('<button id="showContacts" />').append("Показати контактну інформацію");
      let hideBtn = $('<button id="hideContacts" class="hide" />').append("Приховати контактну інформацію");
      let eye = $('<div style="display:flex; margin-top:5px;" />').append($('<div style="margin-right:2px;" />').append("👁 "));
      eye.append($('<div id="views" />').append(data.counter));
      let contactDiv = $('<div class="column floatImg topLine contacts" style="display:none;"/>');
      let authorDiv = $('<div class=""/>').append($('<span>').append('Автор: ', usersList[data.userId - 1].name)); 
      let emailD = $('<div class=""/>').append($('<span>').append('Email: ', usersList[data.userId - 1].email)); 
      let telD = $('<div class=""/>').append($('<span>').append('Tel: ', usersList[data.userId - 1].phone)); 

      titleContainer.append( titleDiv, removeDiv);
      describeDiv.append(categoryDiv, typeDiv, cityDiv);
      contentDiv.append(textDiv);
      contactDiv.append(authorDiv, emailD, telD);
      lastDiv.append(showBtn, hideBtn, eye);
      divReply.append(post.append(titleContainer, describeDiv, contentDiv, lastDiv, contactDiv));
      
    });
}

function searchUser(){
  let selectedUser = curUser;

  if(+selectedUser){
    filterArr[0] = "userId";
    filterArr[1] = selectedUser;
  } else {
    filterArr[0] = undefined
    filterArr[1] = undefined;
  }
  getPosts(filterArr);
}

function searchCategory(){
  let categorySelected = $('#category').children("option:selected").text();
  let condition = $('#category').val();

  if(+condition){
    filterArr[2] = "category";
    filterArr[3] = categorySelected;
  } else {
    filterArr[2] = undefined;
    filterArr[3] = undefined;
  }
  getPosts(filterArr);
}

function searchType(){
  let typeSelected = $('#type').children("option:selected").text();
  let condition = $('#type').val();

  if(+condition){
    filterArr[4] = "type";
    filterArr[5] = typeSelected;
  } else {
    filterArr[4] = undefined;
    filterArr[5] = undefined;
  }
  getPosts(filterArr);
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'PUT',
    body: data,
    name: "5",
    headers: {'Content-Type': 'application/json'}
    })
  return await response.json(); // parses JSON response into native JavaScript objects
}

$(document).ready(function() {
  //Get Post On Document Ready
  getUsers();
  $("body").on("click", "#myAdv", searchUser);
  $("body").on("click", "#allAdv", function(){
    getPosts("");
  });
  $("body").on("click", "#exit", function(){
    localStorage.clear();
    document.location.href = "index.html";
    $('.holder').toggle("hide");
    getPosts("");
  });
  $("body").on("click", "#showContacts", function(event){
    let contactD = $(event.target).parents('.post').children()[4];
    contactD.style.display = "grid";
    let sB = $(event.target).parents('.post').children()[3].childNodes[0];
    let hB = $(event.target).parents('.post').children()[3].childNodes[1];
    sB.classList.toggle("hide");
    hB.classList.toggle("hide");
    let eyeD = $(event.target).parents('.post').children()[3].childNodes[2];
    let viewNum = +eyeD.querySelector("#views").innerText;
    viewNum++;
    eyeD.querySelector("#views").innerText = viewNum;
  });
  $("body").on("click", "#hideContacts", function(event){
    let contactD = $(event.target).parents('.post').children()[4];
    contactD.style.display = "none";
    let sB = $(event.target).parents('.post').children()[3].childNodes[0];
    let hB = $(event.target).parents('.post').children()[3].childNodes[1];
    sB.classList.toggle("hide");
    hB.classList.toggle("hide");
  });
  // $("body").on("click", "#views", function(event){
  //   let eyeD = $(event.target).parents('.post').children()[3].childNodes[2];
  //   let viewNum = +eyeD.querySelector("#views").innerText;
  //   viewNum++;
  //   eyeD.querySelector("#views").innerText = viewNum;
  // });
  $("body").on("click", "#delete", function(){
    if(curUser){
      // alert("Оголошення видалено");
      let postId = $(this).find('#postId')[0].innerText;
      let userId = $(this).find('#userId')[0].innerText;

      if(userId === curUser){
        postList = jQuery.grep(postList, function(value) {
          return value.id != postId;
        });
        let jsonDt = JSON.stringify(postList);
        postData(urlPosts, jsonDt)
        .then((data) => {
          console.log(data); 
          getPosts("");
        });
        alert("Оголошення видалено");
      } else {
        alert("Ви не можете видалити оголошення, яке створили не ви");
      }
    } else {
      alert("Ви не можете видалити оголошення без авторизації");
    }
  });
  $("body").on("click", "#up", function(){
    $(window).scrollTop(0);
  });
  let leftVal;
  $(window).scroll(function(){
    if ($(this).scrollTop() > 25){
      $("#fixedMenu").removeClass("default")
      .addClass("fixed");
      $("#indent").removeClass("hide");
      leftVal = $('#secondWrap').offset().left;;
      $("#fixedMenu").offset({left: leftVal});
    } else if($(this).scrollTop() < 25) {
      $("#fixedMenu").removeClass("fixed")
      .addClass("default");
      $("#indent").addClass("hide");
      leftVal = $('#secondWrap').offset().left;;
      $("#fixedMenu").offset({left: leftVal});
    }
  });
})
