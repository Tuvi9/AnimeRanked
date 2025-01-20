import './styles/main.css'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './components/login-modal.js';
import './components/create-account-modal.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJAzm-S_SC_uvIDuQAApiuqyZgP_uVg8Q",
    authDomain: "animeranked-1b379.firebaseapp.com",
    projectId: "animeranked-1b379",
    storageBucket: "animeranked-1b379.appspot.com",
    messagingSenderId: "269883050820",
    appId: "1:269883050820:web:667243f34e1e79df936511",
    measurementId: "G-1TSVWXNVYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Detect auth state
onAuthStateChanged(auth, user => {
    if(user != null) {
        console.log('logged in!');
        // Access element inside shadow DOM
        const navBar = document.querySelector('nav-bar');
        if (navBar && navBar.shadowRoot) {
            const loginElement = navBar.shadowRoot.querySelector('.website-header-login');
            if (loginElement) {
                loginElement.textContent = 'Profile';
            }
        }
    } else {
        console.log('No user');
        const navBar = document.querySelector('nav-bar');
        if (navBar && navBar.shadowRoot) {
            const loginElement = navBar.shadowRoot.querySelector('.website-header-login');
            if (loginElement) {
                loginElement.textContent = 'Log In';
            }
        }
    }
});

//! HEADER
const headerTemplate = document.createElement('template')

//? Defining the innerHTML which allows me to place HTML content in my template
headerTemplate.innerHTML = `
    <style>
    .website-header {
        display: grid;
        grid-template-columns: 1fr auto auto auto auto;
        border: 5px solid black;
        padding: 20px;
        column-gap: 40px;
        background-image: linear-gradient(white, purple);
    }

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
        text-decoration: underline;
    }
    </style>

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
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
    }
}

customElements.define('nav-bar', NavBar);

// Blog entry template
const blogEntryTemplate = document.createElement('template');
blogEntryTemplate.innerHTML = `
    <style>
        img {
            max-width: 250px;
            max-height: 400px;
            border-radius: 10px;
        }

        .centerd-blog {
            display: flex;
            justify-content: center;
            padding: 10px;
        }

        .blog-entry {
            display: inline-grid;
            grid-template-columns: fit-content(40%) 300px auto;
            grid-template-rows: auto 1fr auto;
            background-color: white;
            border: 5px solid black;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 5px 5px 10px white;
            gap: 30px;
        }

        .blog-image {
            grid-column: 1 / 2;
            grid-row: 1 / 3;
        }

        .blog-title {
            grid-column: 2 / 3;
            grid-row: 1 / 2;
        }

        .blog-content {
            grid-column: 2 / 3;
            grid-row: 2 / 3;
        }
    </style>

    <div class="centerd-blog">
        <div class="blog-entry">
            <div class="blog-image"><img></div>
            <div class="blog-title"><h2></h2></div>
            <div class="blog-content"></div>
        </div>
    </div>
`;

document.addEventListener('DOMContentLoaded', function() {
    class BlogEntry extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(blogEntryTemplate.content.cloneNode(true));
        }

        setImage(src) {
            this.shadowRoot.querySelector('.blog-image img').src = src;
        }

        setTitle(title) {
            this.shadowRoot.querySelector('.blog-title h2').textContent = title;
        }

        setContent(content) {
            this.shadowRoot.querySelector('.blog-content').innerHTML = content;
        }
    }

    customElements.define('blog-entry', BlogEntry);

    const blogContainer = document.getElementById('blog-container');
    if(blogContainer) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const responseArray = JSON.parse(this.responseText);

                responseArray.forEach(response => {
                    const blogEntryElement = document.createElement('blog-entry');
                    blogEntryElement.setImage(response.image);
                    blogEntryElement.setTitle(response.title);
                    blogEntryElement.setContent(response.description);
                    blogContainer.appendChild(blogEntryElement);
                });
            }
        };
        xhttp.open('GET', 'http://localhost:3000/blog/', true);
        xhttp.send();
    }
});

// Mount advertisements
document.addEventListener('DOMContentLoaded', () => {
    const adContainer = document.getElementById('ad-container');
    if (adContainer) {
        const adRoot = createRoot(adContainer);
        adRoot.render(React.createElement(Advertisement));
    }

    const adContainer2 = document.getElementById('ad-container2');
    if (adContainer2) {
        const adRoot2 = createRoot(adContainer2);
        adRoot2.render(React.createElement(Advertisement2));
    }
});