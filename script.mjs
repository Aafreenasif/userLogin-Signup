// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword,sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALHU_SnJkI3_YhgOsvj5Uet-zZUe6zvks",
  authDomain: "practice-b4dd1.firebaseapp.com",
  databaseURL: "https://practice-b4dd1-default-rtdb.firebaseio.com",
  projectId: "practice-b4dd1",
  storageBucket: "practice-b4dd1.appspot.com",
  messagingSenderId: "562615560889",
  appId: "1:562615560889:web:05abd14b20a3d8b5028968"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handling the signup form submission
const signupForm = document.getElementById('signup-button');
signupForm.addEventListener("click", (event) => {
  event.preventDefault();

  // Get input values
  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", password);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up successfully
      const user = userCredential.user;
      alert("Account created");

      // Optionally, update user profile with additional info like username
      updateProfile(auth.currentUser, {
        displayName: username
      }).then(() => {
        console.log("Profile updated with username");
      }).catch((error) => {
        console.error("Error updating profile:", error);
      });
    })
    .catch((error) => {
      console.error("Error creating account:", error.message);
      alert(`Error: ${error.message}`);
    });
});



/// login code 
const loginform = document.getElementById('login-button')
loginform.addEventListener("click",(event)=>{
  event.preventDefault()
  const email = document.getElementById('login-email').value
  const password = document.getElementById('login-password').value
  console.log("email:",email);
  console.log("password:",password);
  
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    // alert("u have been login")
    window.location.href="index2.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("error in login")
  });
})



// Handling the "Forgot Password" link click
const resetPasswordLink = document.getElementById('reset');
resetPasswordLink.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById('login-email').value;
  
  if (!email) {
    alert("Please enter your email address first.");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent! Please check your inbox.");
    })
    .catch((error) => {
      alert("Error sending password reset email: " + error.message);
    });
});
export { app, auth };
