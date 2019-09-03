const view = {

}

view.showComponents = function (name) {
  switch (name) {
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

        cross.addEventListener("click", function(e){
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
          type:form.type.value
        })

        form.name.value = ' '
        form.duration.value = ' '
        form.type.value = ' '
      })

      let listFilms = document.getElementById("list-film")
      let btnList = document.getElementsByTagName("button")
      for(let i=0;i<=btnList.length;i++){
        let btn = btnList[i]
        btn.addEventListener("click",function(e){
          let btnDetail = e.target
          let filmDetail = btnDetail.parentNode
          let liList = filmDetail.getElementsByTagName("li")
          let filmInfoList = []
          for(let j=0;j<=2;j++){
            filmInfoList[j] = liList[j].innerText
          }
          db.collection("movies").add({
            name: filmInfoList[0],
            duration: filmInfoList[1],
            type:filmInfoList[2]
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
      const domain = "https://developers.themoviedb.org/3/"

      let formSearch = document.getElementById("form-search")
      formSearch.addEventListener("submit", getFilm)
      function getFilm(e) {
        e.preventDefault()
        console.log("helo")
        let searchFilm = document.getElementById("film").value
        fetch(`${domain}search/company?api_key=${apiKey}&query=${searchFilm}&page=1`)
          .then((res) => res.json())
          .then((data) => {
            let output = '<h2>Users</h2>';
            let results = data.results
            console.log(results)
            results.forEach(function (film) {
              output += `
                <ul>
                  <li>ID: ${film.id}</li>
                  <li>Name: ${film.name}</li>
                </ul>
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

  }
}