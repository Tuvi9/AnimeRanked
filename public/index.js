//! HEADER
const headerTemplate = document.createElement('template')

//? Defining the innerHTML which allows me to place HTML content in my template
headerTemplate.innerHTML = `

<!-- Defining CSS !-->

<style>
/* Removes the default margin and padding on a webpage*/
body {
    margin: 0;
    padding: 0;
    background-color: purple;
}

.website-header {
    display: grid;
    /* Spaces Anime, Manga, Log in tab from Anime ranked */
    grid-template-columns: 1fr auto auto auto auto;
    border: 5px solid black;
    padding: 20px;
    column-gap: 40px;
    background-image: linear-gradient(white, purple);

}

/* Centers website header horizontally */
.website-header div {
    display: flex;
    align-items: center;
}

.website-header-logo {
    font-size: 40px;
    font-family: sans-serif;
}

.website-header-anime, .website-header-manga, .website-header-login {
    font-size: 20px;
    /* Gives Anime, Manga, Log in an underlining */
    text-decoration: underline;
}
</style>

<!-- HTML !-->

<!-- AnimeRanked header -->
<nav>
    <div class="website-header-centered">
        <div class="website-header">
            <div class="website-header-logo">AnimeRanked</div>
            <div class="website-header-anime">Anime</div>
            <div class="website-header-manga">Manga</div>
            <div class="website-header-login">Log In</div>
        </div>
    </div>
</nav>
`;

class NavBar extends HTMLElement {
    constructor() {
        //! Initializes constructor
        super();
        this.attachShadow({ mode: 'open' });
        //! Clones html content in template into shadowDOM
        this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
    }
}

//! Registering the custom element.
customElements.define('nav-bar', NavBar)