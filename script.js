// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyD-...",
  authDomain: "my-login-app.firebaseapp.com",
  projectId: "my-login-app",
  storageBucket: "my-login-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefg"
};
firebase.initializeApp(firebaseConfig);

// Get references to the elements in the HTML
var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');
var btnLogin = document.getElementById('btnLogin');
var btnSignUp = document.getElementById('btnSignUp');
var btnLogout = document.getElementById('btnLogout');

// Add event listeners for the buttons
btnLogin.addEventListener('click', e => {
  // Get the email and password from the input fields
  var email = txtEmail.value;
  var password = txtPassword.value;
  // Sign in the user with Firebase
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      // User signed in successfully
      console.log('User signed in');
    })
    .catch(error => {
      // Handle errors
      console.log(error.code, error.message);
    });
});

btnSignUp.addEventListener('click', e => {
  // Get the email and password from the input fields
  var email = txtEmail.value;
  var password = txtPassword.value;
  // Create a new user with Firebase
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      // User created successfully
      console.log('User created');
    })
    .catch(error => {
      // Handle errors
      console.log(error.code, error.message);
    });
});

btnLogout.addEventListener('click', e => {
  // Sign out the user with Firebase
  firebase.auth().signOut()
    .then(() => {
      // User signed out successfully
      console.log('User signed out');
    })
    .catch(error => {
      // Handle errors
      console.log(error.code, error.message);
    });
});

// Add an observer for the auth state
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in
    console.log('User is signed in:', user.email);
    // Show the logout button and hide the login and signup buttons
    btnLogout.style.display = 'block';
    btnLogin.style.display = 'none';
    btnSignUp.style.display = 'none';
  } else {
    // User is signed out
    console.log('User is signed out');
    // Hide the logout button and show the login and signup buttons
    btnLogout.style.display = 'none';
    btnLogin.style.display = 'block';
    btnSignUp.style.display = 'block';
  }
});
