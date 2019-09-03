const components = {}

components.eachFilm = `

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
      <button id="bookmark-btn">Bookmark</button>
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
    
    <input type="submit" value="Submit">
  </form>
`