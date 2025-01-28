import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const createAccountTemplate = document.createElement('template');
createAccountTemplate.innerHTML = `
    <style>
        @import "/styles/create-account-modal.css";
    </style>
    <div class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Create Account</h2>
                <button class="close-button">&times;</button>
            </div>
            <form id="create-account-form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required minlength="6">
                </div>
                <div class="form-group">
                    <label for="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" required minlength="6">
                </div>
                <div class="error-message"></div>
                <button type="submit" class="create-account-button">Create Account</button>
                <div class="switch-to-login">Already have an account? Log in</div>
            </form>
        </div>
    </div>
`;

class CreateAccountModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(createAccountTemplate.content.cloneNode(true));
        
        // Get elements
        this.modal = this.shadowRoot.querySelector('.modal');
        this.closeButton = this.shadowRoot.querySelector('.close-button');
        this.createAccountForm = this.shadowRoot.querySelector('#create-account-form');
        this.switchToLoginButton = this.shadowRoot.querySelector('.switch-to-login');
        this.errorMessage = this.shadowRoot.querySelector('.error-message');
        
        // Bind methods
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchToLogin = this.switchToLogin.bind(this);
        
        // Add event listeners
        this.closeButton.addEventListener('click', this.hideModal);
        this.createAccountForm.addEventListener('submit', this.handleSubmit);
        this.switchToLoginButton.addEventListener('click', this.switchToLogin);
    }
    
    showModal() {
        this.modal.style.display = 'flex';
    }
    
    hideModal() {
        this.modal.style.display = 'none';
        this.createAccountForm.reset();
        this.errorMessage.style.display = 'none';
    }
    
    switchToLogin() {
        this.hideModal();
        const loginModal = document.querySelector('login-modal');
        if (loginModal) {
            loginModal.showModal();
        }
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const username = this.shadowRoot.querySelector('#username').value;
        const email = this.shadowRoot.querySelector('#email').value;
        const password = this.shadowRoot.querySelector('#password').value;
        const confirmPassword = this.shadowRoot.querySelector('#confirm-password').value;
        
        if (password !== confirmPassword) {
            this.showError('Passwords do not match');
            return;
        }
        
        try {
            // 1. Create Firebase auth user (same as before)
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // 2. Update Firebase profile (same as before)
            await updateProfile(userCredential.user, {
                displayName: username
            });

            // 3. Store user data in Supabase database (not auth)
            const response = await fetch('http://localhost:3000/blog/create-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: userCredential.user.uid,  // Use Firebase UID to link the data
                    username: username,
                    email: email
                })
            });

            if (!response.ok) {
                throw new Error('Failed to store user data');
            }
            
            this.hideModal();
        } catch (error) {
            console.error('Error:', error);
            let errorMessage = 'Registration failed. Please try again.';
            
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already registered.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password should be at least 6 characters.';
            }
            
            this.showError(errorMessage);
        }
    }
}

customElements.define('create-account-modal', CreateAccountModal);