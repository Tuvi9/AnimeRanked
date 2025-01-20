import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const loginModalTemplate = document.createElement('template');
loginModalTemplate.innerHTML = `
    <style>
        @import "/styles/login-modal.css";
    </style>
    <div class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Login</h2>
                <button class="close-button">&times;</button>
            </div>
            <form id="login-form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required>
                </div>
                <button type="submit" class="login-button">Login</button>
                <div class="switch-to-create" style="text-align: center; color: purple; cursor: pointer; text-decoration: underline; margin-top: 10px;">
                    Need an account? Create one
                </div>
            </form>
        </div>
    </div>
`;

class LoginModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(loginModalTemplate.content.cloneNode(true));
        
        // Get elements
        this.modal = this.shadowRoot.querySelector('.modal');
        this.closeButton = this.shadowRoot.querySelector('.close-button');
        this.loginForm = this.shadowRoot.querySelector('#login-form');
        
        // Bind methods
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        // Add event listeners
        this.closeButton.addEventListener('click', this.hideModal);
        this.loginForm.addEventListener('submit', this.handleSubmit);
        
        // Listen for clicks on the login button in the header
        document.addEventListener('DOMContentLoaded', () => {
            const navBar = document.querySelector('nav-bar');
            if (navBar && navBar.shadowRoot) {
                const loginButton = navBar.shadowRoot.querySelector('.website-header-login');
                if (loginButton) {
                    loginButton.addEventListener('click', this.showModal);
                }
            }
        });

        this.switchToCreateButton = this.shadowRoot.querySelector('.switch-to-create');
        this.switchToCreateButton.addEventListener('click', () => {
            this.hideModal();
            const createAccountModal = document.querySelector('create-account-modal');
            if (createAccountModal) {
                createAccountModal.showModal();
            }
        });
    }
    
    showModal() {
        this.modal.style.display = 'flex';
    }
    
    hideModal() {
        this.modal.style.display = 'none';
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        const email = this.shadowRoot.querySelector('#email').value;
        const password = this.shadowRoot.querySelector('#password').value;
        
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            this.hideModal();
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please check your credentials.');
        }
    }
}

customElements.define('login-modal', LoginModal);