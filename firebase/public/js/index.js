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
var provider = new firebase.auth.GoogleAuthProvider();
const app = firebase.initializeApp(firebaseConfig);

console.log(app);

const auth = firebase.auth();
console.log(auth);

let myButton = document.getElementById('myButton')


function signUpUser() {
    let email = document.getElementById('email').value.trim()
    let username = document.getElementById('name').value.trim()
    let password = document.getElementById('password').value.trim()
    let confirm = document.getElementById('confirm').value.trim()

    if (!email || !username || !password || !confirm) {
        alert('all fields are mandatory')
    } else if (confirm !== password) {
        alert('passwords must match')
    } else {
        showLoadingandDisable('loading..', true)

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user
                user.updateProfile({
                    displayName: username
                }).then(() => {
                    alert('sign up successful')
                    window.location.href = './login.html'
                    showLoadingandDisable('sign up', false)
                }).catch((error) => {
                    alert('sign up successful , failed to udpate username')
                    window.location.href = './login.html'
                    showLoadingandDisable('sign up', false)
                });



            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage)
                showLoadingandDisable('sign up', false)
            });
    }
}


function showLoadingandDisable(text, isloading) {
    myButton.value = text
    // isloading ? myButton.style.backgroundColor = 'blue' : myButton.style.backgroundColor = 'yellow'
    myButton.disabled = isloading
}


function signInWithGoogle() {
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            alert('sign in successful')
            window.location.href = 'dashboard.html'
            // IdP data available in result.additionalUserInfo.profile.
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
}





// let firebase = {
//     auth: function (params) {
//         return {
//             createUserWithEmailAndPassword: async (email, password) => {

//             }
//         }
//     }
// }

// console.log(firebase.auth().createUserWithEmailAndPassword('david@gmail.com', 'gshsvbs'));
