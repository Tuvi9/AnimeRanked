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
        <div class="blog-image"><img></div>
        <div class="blog-title"><h2></h2></div>
        <div class="blog-content"></div>
    </div>
</div>
`;

//* Loads the initial HTML document before any file manipulation is attempted to prevent errors.
document.addEventListener('DOMContentLoaded', function() {
    class BlogEntry extends HTMLElement {
        //* When an element is created.
        constructor() {
            super()
            //* Allows encapsulated CSS/HTML.
            this.attachShadow({ mode: 'open' });
            //* Insert InnerHTML into ShadowDOM.
            this.shadowRoot.appendChild(blogEntryTemplate.content.cloneNode(true));
        }
        //* .blog-image img is now setImage in shadowDOM.
        setImage(src) {
            this.shadowRoot.querySelector('.blog-image img').src = src;
        }
        //* .blog-title h2 is now setTitle in shadowDOM.
        setTitle(title) {
            this.shadowRoot.querySelector('.blog-title h2').textContent = title;
        }
        //* .blog-content is now  setContent in shadowDOM.
        setContent(content) {
            this.shadowRoot.querySelector('.blog-content').innerHTML = content;
        }
    }

    //* Registers the custom element <blog-entry></blog-entry>.
    customElements.define('blog-entry', BlogEntry);

    //* Retrives element ID blog-container from DOM.
    const blogContainer =  document.getElementById('blog-container');
    //* Ensures the container exsists before continuing.
    if(blogContainer) {
        //* XMLHttpRequest for interacting with the server via HTTP.
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            //* First checks if the request is complete == 4 and if the response status is 200(OK).
            if (this.readyState == 4 &&  this.status == 200) {
                //* Parses server JSON file and turns it into a JavaScript array.
                const responseArray = JSON.parse(this.responseText);

                responseArray.forEach(response => {
                    const blogEntryElement = document.createElement('blog-entry');
                    //* Updates customElement blog-entry image, title, description with what was fetched from the database.
                    blogEntryElement.setImage(response.image);
                    blogEntryElement.setTitle(response.title);
                    blogEntryElement.setContent(response.description);
                    //* Appends said instance to the container blog-container.
                    blogContainer.appendChild(blogEntryElement);
                });
            } else {
                 //* If empty.
                console.error('Error: Respose array is empty');
            }
        };
        //* Initializes the Get request.
        xhttp.open('GET', 'http://localhost:3000/blog/', true)
        xhttp.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        xhttp.setRequestHeader('Pragma', 'no-cache');
        xhttp.setRequestHeader('Expires', '0');
        //* Sends the request.
        xhttp.send();
        } else {
            console.log('Error: blog-conainer not found');
        }
    });
