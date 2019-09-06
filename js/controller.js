const controller = {}

controller.login = async function(loginInfo){
  //1. khoa nut login
  //2. try await firebase
  //3. set text error = error
  let loginBtn = document.getElementById("login_btn")
  loginBtn.setAttribute("disabled",true)
  view.setText("login_error", " ")

  try{
    let result = await firebase.auth().signInWithEmailAndPassword(loginInfo.email,loginInfo.password)
    if(result.user.emailVerified){
      alert("Log in succeeded")
    }
    else{
      throw new Error("User must verify email")
    }
    console.log(result.user.emailVerified)
  }
  catch(err){
    view.setText("login_error",err.message)
    loginBtn.removeAttribute("disabled")
  }
}

controller.register = async function(registerInfo){
  view.setText("register_error", "");
  view.setText("register_success", "");
  let registerBtn = document.getElementById("register_btn")
  registerBtn.setAttribute("disabled", true)

  try{
    //1. create user with email and password
    //2. updateProfile thêm display name
    //3. send Email Verify
    let result = await firebase.auth().createUserWithEmailAndPassword(registerInfo.email,registerInfo.password)
    await result.user.updateProfile({
      displayName: registerInfo.firstname + " " + registerInfo.lastname
    })
    console.log(result.user)
    await result.user.sendEmailVerification()
    view.setText("register_success", "An email verification has been sent");
    registerBtn.removeAttribute("disabled")

  }
  catch(err){
    view.setText("register_error",err.message)
  }
}

controller.initAuth = function () {
  firebase.auth().onAuthStateChanged(authStateChangeHandler)

  function authStateChangeHandler(user) { 
    if (user && user.emailVerified) {
      model.authenticated(user) //
      view.showComponents("comment")
    }
    else {
      view.showComponents("login")
    }
    // let authCallAt = Date.now() - startTime
    // console.log("auth state changed call after:" + authCallAt)
  }
}