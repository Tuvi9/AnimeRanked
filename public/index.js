//! HEADER
const headerTemplate = document.createElement('template')

//? Defining the innerHTML which allows me to place HTML content in my template
headerTemplate.innerHTML = `

<!-- Defining CSS !-->

<style>
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

<!-- AnimeRanked header !-->
<nav>
    <div>
        <div class="website-header">
            <div class="website-header-logo">AnimeRanked</div>
            <div class="website-header-anime">Anime</div>
            <div class="website-header-manga">Manga</div>
            <div class="website-header-login">Log In</div>
        </div>
    </div>
</nav>
`;

//! Blog entry
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


const blogEntryTemplate = document.createElement('template')

blogEntryTemplate.innerHTML = `

<!-- CSS !-->

<style>
img {
/* Maw width && height for the image of the anime so that it doesn't get too big */
    max-width: 400px;
    max-height: 400px;
    border-radius: 10px;
}

/* Centers the grid box */
    .centerd-blog {
    display: flex;
    justify-content: center;
    padding: 10px;
    }

/* All of the blog-entry box styling */
.blog-entry {
    /* inline-grid so that the box only takes up as much as is needed */
    display: inline-grid;
    /* 2 Columns && 3 Rows */
    grid-template-columns: fit-content(40%) 300px auto;
    grid-template-rows: auto 1fr auto;
    background-color: white;
    border: 5px solid black;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 5px 5px 10px white;
    gap: 30px;
    }

/* Image of the anime takes up the left side completely */
.blog-image {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
}

/* The Title of the anime takes up the top left side of the box */
.blog-title {
    grid-column: 2 / 3;
    grid-row: 1 / 2
}

/* Content resides below the title and takes up the rest of the left side */
.blog-content {
    grid-column: 2 / 3;
    grid-row; 2 / 3;
}
</style>

<!-- HTML !-->

<!-- AnimeRanked blog entry template --!>
<div class="centerd-blog">
    <div class="blog-entry">
        <div class="blog-image"><img src="/images/jujutsu_kaisen_2.jpg"></div>
        <div class="blog-title"><h2>Jujutsu Kaisen</h2></div>
        <div class="blog-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
    </div>
</div>
`;

class BlogEntry extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(blogEntryTemplate.content.cloneNode(true));
    }
}

customElements.define('blog-entry', BlogEntry);