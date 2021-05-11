let getData = [];
let advList = [];
let reader = new FileReader();

console.log(reader.readAsText('db.json'));
// const getDB = async() => {
//   let DB = await(await fetch('users.json')).json();

//   console.log(DB);
// };

// getDB();

// function status(response) {
//   //Check Promise
//   if (response.status >= 200 && response.status < 300) {
//     return Promise.resolve(response)
//   } else {
//     return Promise.reject(new Error(response.statusText))
//   }
// }

// function json(response) {
//   //Return JSON format
//   return response.json()
// }

// function getUsers(){
  
//   fetch('users.json')
//     .then(status)
//       .then(json)
//         .then(function(dataList) {
//           advList = dataList;  
//           console.log(dataList);  
//           dataList.forEach(function(data){
//             $('#category').append($('<option>', { 
//               value: data.id,
//               text : data.name 
//           }));
//         });
//     getPosts("");
    
    
//   })
//   .catch(function(error) {
//     console.log('Fetch User Error :-S', error);
//   });
  
// }

// function getPosts(option){
  
//   fetch('db.json' + option)
//     .then(status)
//       .then(json)
//         .then(function(dataList) {
//           getData = dataList;
//           let divReply = $(".reply")
//           divReply.empty();
          
//           dataList.forEach(function(data){
//             let post = $('<p class="post"/>');
            
//             let divID = $('<div class="userName"/>').append($('<span>').append('By: ', advList[data.userId - 1].name));    
//             var divTitle = $('<div class="title"/>').append(data.title);
//             var divBody = $('<div class="body"/>').append(data.body)
            
//             divReply.append(post.append(divID,divTitle,divBody));
            
//           });
    
//   })
//   .catch(function(error) {
//     console.log('Fetch Post Error :-S', error);
//   });
// }



// $(document).ready(function() {
//   //Get Post On Document Ready
//   getUsers();
// })

// function searchUser(){
//   var userSelected = $('#selUser').val();
  
//   if (userSelected != 0){
//     getPosts("?userId=" + userSelected);
//   }
//   else{
//     getPosts("");
//   }
// }