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


function checkUserAuth() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/v8/firebase.User
            var uid = user.uid;
            forUserName.innerHTML = user.displayName || 'user'
            console.log(user, 'im here');

        } else {
            // User is signed out
            // ...
            console.log('im in the else block');
            window.location.href = '../public/login.html'
        }
    });
}


checkUserAuth()


function logUserOut() {
    let canLogout = confirm('are you sure?')
    if (canLogout) {
        auth.signOut().then(() => {
            window.location.href = '../public/login.html'
        }).catch((error) => {
            console.log(error);
            alert(error.message)
        });
    }

}