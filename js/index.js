let postList = [];
let usersList = [];
let categoriesList = [];
let filterArr = [];
let urlPosts = 'https://test1-c5fc6-default-rtdb.firebaseio.com/0.json';
let urlUsers = 'https://test1-c5fc6-default-rtdb.firebaseio.com/1.json';
let urlCategories = 'https://test1-c5fc6-default-rtdb.firebaseio.com/2.json';


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
          usersList = dataList.users;    
          usersList.forEach(function(data){
            $('#users').append($('<option>', { 
              value: data.id,
              text : data.name 
            }));
          });
          getPosts("");
        })
  .catch(function(error) {
    console.log('Fetch User Error :-S', error);
  });
}

// function getCategories(){
//   fetch(urlCategories)
//     .then(status)
//       .then(json)
//         .then(function(dataList){
//           categoriesList = dataList.category;    
//           categoriesList.forEach(function(data){
//             let index = categoriesList.indexOf(data) + 1;
//             $('#category').append($('<option>', { 
//               value: index,
//               text : data
//             }));
//           });
//           getPosts("");
//         })
//   .catch(function(error) {
//     console.log('Fetch User Error :-S', error);
//   });
// }

function getPosts(arr){  
  fetch(urlPosts)
  .then(status)
  .then(json)
  .then(function(dataList) {  
    postList = dataList.db;
    let divReply = $(".reply")
    divReply.empty();
    
    // if(option){
      postList = postList.filter( obj => {
        console.log(arr);
        if(obj[arr[0]] == arr[1] && obj[arr[2]] == arr[3]) {
          return obj;
        }
      });
      
    // }

    console.log(postList);
    postList.forEach(function(data){

      let post = $('<p class="post"/>');
      let describeDiv = $('<div class="holder bottomLine"/>');

      let categoryDiv = $('<div class="category"/>').append('Категорія: ', data.category);
      let typeDiv =  $('<div class="type"/>').append('Тип: ', data.type); 
      let cityDiv = $('<div class="city"/>').append('Місто: ', usersList[data.userId - 1].city);
      let authorDiv = $('<div class="userName"/>').append($('<span>').append('Автор: ', usersList[data.userId - 1].name));  
      let textDiv = $('<div class="body bottomLine"/>').append(data.text);
      let contactDiv = $('<div class="holder"/>');
      let emailD = $('<div class=""/>').append($('<span>').append('Email: ', usersList[data.userId - 1].email)); 
      let telD = $('<div class=""/>').append($('<span>').append('Tel: ', usersList[data.userId - 1].phone)); 

      describeDiv.append(categoryDiv, typeDiv, cityDiv);
      contactDiv.append(emailD, telD);
      divReply.append(post.append(authorDiv, describeDiv, textDiv, contactDiv));
      
    });
    
  })
  .catch(function(error) {
    console.log('Fetch Post Error :-S', error);
  });
}



$(document).ready(function() {
  //Get Post On Document Ready
  // getCategories();
  getUsers();
})

function filterCategory(){

}
function searchCategory(){
  let categorySelected = $('#category').children("option:selected").text();
  let condition = $('#category').val();

  if(+condition){
    filterArr[2] = ["category"];
    filterArr[3] = [categorySelected];
  } else {
    filterArr[2] = undefined;
    filterArr[3] = undefined;
  }

  getPosts(filterArr);
  // if (categorySelected != 0){
  // }
  // else{
  //   getPosts("");
  // }
}

function searchUser(){
  let userSelected = $('#users').val();

  if(+userSelected){
    filterArr[0] = ["userId"];
    filterArr[1] = [userSelected];
  } else {
    console.log(filterArr[2], filterArr[3]);
    filterArr[0] = undefined
    filterArr[1] = undefined;
  }
  
  getPosts(filterArr);
  // if (userSelected != 0){
  // }
  // else{
  //   getPosts("");
  // }
}
