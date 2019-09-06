const view = {

}

view.showComponents = function (name) {
  switch (name) {
    case "login": {
      document.getElementById("app").innerHTML = components.login
      let form = document.getElementById("form-login")

      let link = document.getElementById("register-form-link");
      // link.onclick = linkClickHandler
      link.addEventListener("click", linkClickHandler);
      // 1 dạng callback cứ khai báo hàm ra khi nào chạy thì gọi  

      function linkClickHandler() {
        view.showComponents("register");
      }

      form.onsubmit = formSubmitHandler
      function formSubmitHandler(e) {
        e.preventDefault()
        let loginInfo = {
          email: form.email.value,
          password: form.password.value
        }
        if (loginInfo.email) {
          view.setText("email_error", " ")
        }
        else {
          view.setText("email_error", "Invalid Email")
        }

        if (loginInfo.password) {
          view.setText("email_error", " ")
        }
        else {
          view.setText("password_error", "Invalid Password")
        }

        if (loginInfo.email && loginInfo.password) {
          controller.login(loginInfo)
        }
      }

      break
    }
    case "register": {
      document.getElementById("app").innerHTML = components.register

      let loginLink = document.getElementById("register-form-link")
      loginLink.addEventListener("click", formOnClickHandler)
      function formOnClickHandler() {
        view.showComponents("login")
      }

      let registerForm = document.getElementById("form-register")
      registerForm.onsubmit = registerFormSubmitHandler
      function registerFormSubmitHandler(e) {
        e.preventDefault()
        let registerInfo = {
          firstname: registerForm.firstname.value,
          lastname: registerForm.lastname.value,
          email: registerForm.email.value,
          password: registerForm.password.value,
          confirmPassword: registerForm.confirmPassword.value
        }

        let userInfo = ["firstname", "lastname", "email", "password"];
        for (i = 0; i < userInfo.length; i++) {
          if (registerInfo[userInfo[i]]) {
            view.setText(`${userInfo[i]}_error`, "")
          }
          else {
            view.setText(`${userInfo[i]}_error`, `Invalid ${userInfo[i]}!`)
          }
        }
        //if(validate(register_info.password)){}

        if (registerInfo.confirmPassword && registerInfo.confirmPassword == registerInfo.password) {
          view.setText("confirmPassword_error", "")
        }
        else {
          view.setText("confirmPassword_error", "Invalid confirm password!")
        }

        //3. submit info
        if (registerInfo.firstname
          && registerInfo.lastname
          && registerInfo.email
          && registerInfo.password
          && registerInfo.password == registerInfo.confirmPassword) {
          controller.register(registerInfo)
        }

      }

      break
    }
    case "comment": {
      document.getElementById("app").innerHTML = components.comment

      let commentForm = document.getElementById("comment-form")
      commentForm.onsubmit = commentFormSubmitHandler

      function commentFormSubmitHandler(e) {
        e.preventDefault()

        let commentContent = commentForm.commentMessage.value.trim()
        if (commentContent) {
          let comment = {
            content: commentContent,
            createdAt: new Date().toISOString(),
            owner: "nnquang.1412@gmail.com"
          }
          db.collection("comments")
            .doc("GPYLaJ5HBeG6ATGfNhvQ")
            .update({
              comments: firebase.firestore.FieldValue.arrayUnion(comment),
            })
            
          commentForm.commentMessage.value = " "
        }
        db.collection("comments")
          .onSnapshot((snapShot)=>{
            let changes = snapShot.docChanges()
            console.log(changes)
          })
      }
      break
    }
    case "eachFilm": {
      document.getElementById("app").innerHTML = components.eachFilm
      let btnSwitch = document.getElementById("switch");
      btnSwitch.addEventListener("click", function () {
        view.showComponents("userProfile")
      })

      let listFilmsBookMark = document.getElementById("list-film-bookmark");
      db.collection("movies")
        .onSnapshot((snapShot) => {
          let changes = snapShot.docChanges() //thay đổi trên database mỗi khi database được gọi
          changes.forEach((change) => {
            if (change.type == "added") {
              renderFilm(change.doc)
            }
            else if (change.type == "removed") {
              let li = listFilmsBookMark.querySelector(`[film-id=${change.doc.id}`) //lay ra item trong cafelist ma co id cua cai doc vừa bị change 
              listFilmsBookMark.removeChild(li)

            }
          })
        })

      function renderFilm(doc) {
        let li = document.createElement("li")
        let cross = document.createElement("div")
        let name = document.createElement("span")
        let duration = document.createElement("span")
        let type = document.createElement("span")


        li.setAttribute("film-id", doc.id)
        let film = doc.data()
        let filmInfo = {
          name: film.name,
          duration: film.duration,
          type: film.type
        }

        name.textContent = filmInfo.name
        duration.textContent = filmInfo.duration
        type.textContent = filmInfo.type
        cross.textContent = 'x'

        li.appendChild(name)
        li.appendChild(duration)
        li.appendChild(type)
        li.appendChild(cross)
        listFilmsBookMark.appendChild(li)

        cross.addEventListener("click", function (e) {
          e.stopPropagation()
          let id = e.target.parentNode.getAttribute("film-id")
          db.collection("movies").doc(id).delete() //lay duoc 1 document co id la tren 
        })
      }

      let form = document.getElementById("add-film-form")
      form.addEventListener("submit", function (e) {
        e.preventDefault()
        db.collection("movies").add({
          name: form.name.value,
          duration: form.duration.value,
          type: form.type.value
        })

        form.name.value = ' '
        form.duration.value = ' '
        form.type.value = ' '
      })

      let listFilms = document.getElementById("list-film")
      let btnList = document.getElementsByTagName("button")
      for (let i = 0; i <= btnList.length; i++) {
        let btn = btnList[i]
        btn.addEventListener("click", function (e) {
          let btnDetail = e.target
          let filmDetail = btnDetail.parentNode
          let liList = filmDetail.getElementsByTagName("li")
          let filmInfoList = []
          for (let j = 0; j <= 2; j++) {
            filmInfoList[j] = liList[j].innerText
          }
          db.collection("movies").add({
            name: filmInfoList[0],
            duration: filmInfoList[1],
            type: filmInfoList[2]
          })
        })
      }


      break
    }
    case "userProfile": {
      document.getElementById("app").innerHTML = components.userProfile
      let btnSwitch = document.getElementById("switch");
      btnSwitch.addEventListener("click", function () {
        view.showComponents("eachFilm")
      })
      console.log(components.userProfile)
      break
    }
    case "search": {
      document.getElementById("app").innerHTML = components.search

      let searchBtn = document.getElementById("search-button")
      searchBtn.addEventListener("click", getFilm)

      const apiKey = "4ed0cebb0e29c1bf16f16020ca8307af"
      const domain = "https://api.themoviedb.org/3"
      const domainImage = "http://image.tmdb.org/t/p/w500"
      let formSearch = document.getElementById("form-search")
      formSearch.addEventListener("submit", getFilm)
      function getFilm(e) {
        e.preventDefault()
        console.log("helo")
        let searchFilm = document.getElementById("film").value
        fetch(`${domain}/search/movie?api_key=${apiKey}&language=en-US&query=${searchFilm}&page=1&include_adult=false`)
          .then((res) => res.json())
          .then((data) => {
            let output = '<h2>Users</h2>';
            let results = data.results
            console.log(results)
            results.forEach(function (film) {
              output += `
                <ul>
                  <li>ID: ${film.id}</li>
                  <li>Name: ${film.title}</li>
                </ul>
                <img src="${domainImage + film.backdrop_path}" alt="Smiley face">
              `
            })
            document.getElementById("search-output").innerHTML = output
          })
      }
      let getUserBtn = document.getElementById("get-user-button")
      getUserBtn.addEventListener("click", getUser)
      function getUser() {
        fetch("https://jsonplaceholder.typicode.com/posts")
          .then((res) => res.json())
          .then((data) => {
            let output = '<h2>Users</h2>';
            console.log(data)
            data.forEach(function (post) {
              output += `
                <ul>
                  <li>ID: ${post.id}</li>
                  <li>Name: ${post.title}</li>
                </ul>
              `
            });
            document.getElementById("search-output").innerHTML = output
          })
      }
      // let addPostBtn = document.getElementById("form-search")
      // addPostBtn.addEventListener("submit", addPost)

      // function addPost(e) {
      //   e.preventDefault();

      //   let film = document.getElementById("film").value
      //   let body = document.getElementById("body").value

      //   fetch('https://jsonplaceholder.typicode.com/posts', {
      //     method: 'POST',
      //     headers: {
      //       'Accept': "application/json, text/plain,*/*",
      //       'Content-type': "application/json"
      //     },
      //     body: JSON.stringify({
      //       film: film,
      //       body: body
      //     })
      //   })
      //     .then((res) => res.json())
      //     .then((data) => console.log(data))
      // }




      break
    }
    case "mainPage":{
      document.getElementById("app").innerHTML = components.mainPage
      let listFilms = document.getElementById("list-films")
      db.collection("movies").get()
        .then((res) =>{
          res.docs.forEach((doc)=>{
            let result = doc.data()
            let filmDetail = {
              actors:result.actors,
              backdropPath:result.backdropPath,
              duration:result.duration,
              filmLink:result.filmLink,
              overview:result.overview,
              posterPath:result.posterPath,
              rating:result.rating,
              releaseDay:result.releaseDay,
              title:result.title,
              type:result.type
            }
          listFilms.innerHTML += `
            <div class="film-frame">
              <div id="film-pic">
                <img class="img" src="" alt ="">
                <div id="bookmark-film">Save</div>
              </div>

              <div id="basic-info">
                <div id="name"></div>
                <div id="release-day"></div>
                <div id="type"></div>
              </div>
            </div>
          `
          })
        })
      
      
      
      break
    }

  }
}

view.setText = function (id, text) {
  document.getElementById(id).innerHTML = text
}







