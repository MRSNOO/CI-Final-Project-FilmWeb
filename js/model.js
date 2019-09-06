const model = { 
  authUser: null,
  commentActive:null
}

// model.loadComments = function(email){
//   db.collection("comments")
//     .where("users","array-contains",email)
//     .onSnapShot(snapShotHandler)

//     function snapShotHandler(results){

//     }
// }

model.authenticated = function(authUser) {
  model.authUser = authUser
}








