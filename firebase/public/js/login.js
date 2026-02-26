console.log(firebase);


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDlBPc_4_HimxYu9rBL8gvjSH9BtsU4Qc",
    authDomain: "newchatapp-3345d.firebaseapp.com",
    projectId: "newchatapp-3345d",
    storageBucket: "newchatapp-3345d.firebasestorage.app",
    messagingSenderId: "429796481737",
    appId: "1:429796481737:web:130cb3211ae42b627e8b18"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
console.log(app);

const auth = firebase.auth();
console.log(auth);

function logInUser(params) {
    let email = document.getElementById('email').value.trim()
    let password = document.getElementById('password').value.trim()

    if (!email || !password) {
        alert('all fields are mandatory')
        return
    }

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            alert('login successful')
            window.location.href = './dashboard.html'

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
}