const components = {}


components.login = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="../css/login.css">
    
  
  </head>
  <body>
    <section class="log-in-container">
        <form id="form-login" class="form-login">
  
            <div class="form-header">
              <h3>Mindx Chat</h3>
            </div>
      
            <div class="form-content">
              <div class="input-wrapper">
                <input name="email" type="email" placeholder="Email">
                <div id="email_error" class="message_error"></div>
              </div>
      
              <div class="input-wrapper">
                <input name="password" type="password" placeholder="Password">
                <div id="password_error" class="message_error"></div>
              </div>
            </div>
      
            <div id="login_error" class="message_error"></div>
            <div class="form-footer">
              <a id="register-form-link" href="#">Not yet registered? Sign Up </a>
              <button id="login_btn">Login</button>
            </div>
          </form> 
    </section>
  
  
  
  </body>
  </html>
  `

components.register = `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=\, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="../css/register.css">

</head>

<body>
  <section class="register-container">
    <form id="form-register" class="form-register">

      <div class="form-header">
        <h3>Mindx Chat</h3>
      </div>

      <div class="form-content">

        <div class="name-wrapper">
          <div class="input-wrapper">
            <input name="firstname" type="text" placeholder="First Name" required>
            <div id="firstname_error" class="message_error"></div>
          </div>

          <div class="input-wrapper">
            <input name="lastname" type="text" placeholder="Last Name" required>
            <div id="lastname_error" class="message_error"></div>
          </div>
        </div>

        <div class="input-wrapper">
          <input name="email" type="email" placeholder="Email" required>
          <div id="email_error" class="message_error"></div>
        </div>

        <div class="input-wrapper">
          <input name="password" type="password" placeholder="Password" required>
          <div id="password_error" class="message_error"></div>
        </div>

        <div class="input-wrapper">
          <input name="confirmPassword" type="password" placeholder="Confirm Password" required>
          <div id="confirmPassword_error" class="message_error"></div>
        </div>

      </div>
      
      <div id="register_error" class="message_error"></div>
      <div id="register_success" class="message_success"></div>
      <div class="form-footer">
        <a id="register-form-link" href="#">Already have an account? Login </a>
        <button id="register_btn" >Register</button>
      </div>
    </form>
  </section>



</body>

</html>`

components.eachFilm = `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="../css/eachFilm.css">
    
  
  </head>
  <body>
<form id="add-film-form">
<input type="text" name="name" placeholder="Movie Name">
<input type="text" name="duration" placeholder="Duration">
<input type="text" name="type" placeholder="Type">

<button>Add Film</button>
</form>
  <ul id="list-film-bookmark">
  
  </ul>

  <button id="switch">Switch</button>
  <section id="list-film">
    <div class="each-film">
      <ul>
        <li>Thor</li>
        <li>120</li>
        <li>superhero</li>
      </ul>
      <button id="bookmark-btn" >Bookmark</button>
    </div>

    <div class="each-film">
      <ul>
        <li>Thor2</li>
        <li>181</li>
        <li>superhero</li>
      </ul>
      <button id="bookmark-btn">Bookmark</button>

    </div>

    <div class="each-film">
      <ul>
        <li>Thor3</li>
        <li>129</li>
        <li>superhero</li>
      </ul>
      <button id="bookmark-btn">Bookmark</button>

    </div>
  </section>
</body>
`
components.comment = `
<section class="comment-container">
    <div id="list-comments" class="list-comments">
    </div>
    <div id="current-comment" class="current-comment">
      <form id="comment-form" class="comment-form">
        <div class="input-wrapper">
          <input class="input-chat" type="text" name="commentMessage" placeholder="Enter your comment">
        </div>
        <button id="comment-submit-btn">Send</button>
      </form>
    </div>
</section>
`
components.userProfile = `
  <section id="list-film-bookmark2">
    heloooo
  </section>
  <button id="switch">Switch</button>
  

`

components.search = `
  <div id="search">
      <button id="search-button">Search</button>
      <button id="get-user-button">Get User</button>
    <div id="search-output"></div>
  </div>

  <form id="form-search" class="form-search">
    <div class="input-wrapper">
      <input name="film" type="text" id="film" placeholder="Search Your Film">
    </div>
    
  </form>
`

components.mainPage = `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="../css/mainPage.css">
    
</head>
<section id="home-page">
  <div id="nav">
    <div id="logo">helooo</div>
    <div id="nav-bar">
      <ul>
        <li id="Home">Home</li>
        <li id="Movie">Movie</li>
        <li id="Bookmark">Bookmark</li>
        <li id="Account">Account</li>
        <li id="log-out">Log Out</li>
      </ul>
    </div>
  </div>

  <section id="film-container">
    <div id="header">
      <div id="search"></div>
      <div id="login"></div>
    </div>

    <div id="list-films">
    </div>
    <div id="list-films-bookmark"></div>
  </section>
</section>
`