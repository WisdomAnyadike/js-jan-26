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
                    window.location.href = '../public/login.html'
                    showLoadingandDisable('sign up', false)
                }).catch((error) => {
                    alert('sign up successful , failed to udpate username')
                    window.location.href = '../public/login.html'
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


// let firebase = {
//     auth: function (params) {
//         return {
//             createUserWithEmailAndPassword: async (email, password) => {

//             }
//         }
//     }
// }

// console.log(firebase.auth().createUserWithEmailAndPassword('david@gmail.com', 'gshsvbs'));
