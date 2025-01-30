// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBc2p_OYkuo1IYw4xc-0NYn0M5VtMf-iVI",
    authDomain: "mertek-archive-site-login.firebaseapp.com",
    projectId: "mertek-archive-site-login",
    storageBucket: "mertek-archive-site-login.appspot.com",
    messagingSenderId: "194382051161",
    appId: "1:194382051161:web:21e9ea763a0d59bd33be48",
    measurementId: "G-FTYTP99H96"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

// DOM Elements
const googleSignInButton = document.getElementById('google-sign-in');
const emailPasswordLogin = document.getElementById('email-password-login');
const profileSection = document.getElementById('profile');
const signOutButton = document.getElementById('sign-out');
const editUsernameInput = document.getElementById('edit-username');
const saveUsernameButton = document.getElementById('save-username');
const userNameElement = document.getElementById('user-name');
const profilePicture = document.getElementById('profile-picture');
const uploadProfilePictureButton = document.getElementById('upload-profile-picture');
const loginEmailButton = document.getElementById('login-email');
const registerEmailButton = document.getElementById('register-email');

// Google Sign-In
googleSignInButton.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => handleUserSignIn(result.user))
        .catch(error => console.error("Google Sign-In Error:", error.message));
});

// Email and Password Login/Registration
loginEmailButton.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => handleUserSignIn(userCredential.user))
        .catch(error => console.error("Login Error:", error.message));
});

registerEmailButton.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => handleUserSignIn(userCredential.user))
        .catch(error => console.error("Registration Error:", error.message));
});

// Save Username
saveUsernameButton.addEventListener('click', () => {
    const newUsername = editUsernameInput.value.trim();
    const user = auth.currentUser;
    if (user && newUsername) {
        database.ref('users/' + user.uid).update({ username: newUsername })
            .then(() => userNameElement.innerText = `Welcome, ${newUsername}`)
            .catch(error => console.error("Username Update Error:", error.message));
    }
});

// Trigger File Picker When Upload Button is Clicked
uploadProfilePictureButton.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const user = auth.currentUser;
        const storageRef = storage.ref(`profile_pictures/${user.uid}`);

        try {
            const snapshot = await storageRef.put(file);
            const downloadURL = await snapshot.ref.getDownloadURL();
            
            // Update Firebase Database
            await database.ref('users/' + user.uid).update({ photoURL: downloadURL });

            // Update UI Instantly
            profilePicture.src = downloadURL;
            console.log("Profile picture updated successfully!");
        } catch (error) {
            console.error("Upload Error:", error.message);
        }
    });

    input.click(); // Open file selection dialog
});

// Sign Out
signOutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        profileSection.style.display = 'none';
        googleSignInButton.style.display = 'inline-block';
        emailPasswordLogin.style.display = 'block';
    });
});

// Handle User Sign-In
function handleUserSignIn(user) {
    googleSignInButton.style.display = 'none';
    emailPasswordLogin.style.display = 'none';
    profileSection.style.display = 'block';

    const userRef = database.ref('users/' + user.uid);
    userRef.once('value').then(snapshot => {
        if (!snapshot.exists()) {
            userRef.set({ username: user.displayName || user.email, photoURL: "" });
        } else {
            const userData = snapshot.val();
            userNameElement.innerText = `Welcome, ${userData.username}`;
            profilePicture.src = userData.photoURL || 'default-profile.png';
        }
    });
}

// Monitor Authentication State
auth.onAuthStateChanged(user => {
    if (user) {
        handleUserSignIn(user);
    } else {
        profileSection.style.display = 'none';
        googleSignInButton.style.display = 'inline-block';
        emailPasswordLogin.style.display = 'block';
    }
});
