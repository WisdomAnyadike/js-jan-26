const firebaseConfig = {
    apiKey: "AIzaSyDDlBPc_4_HimxYu9rBL8gvjSH9BtsU4Qc",
    authDomain: "newchatapp-3345d.firebaseapp.com",
    databaseURL: "https://newchatapp-3345d-default-rtdb.firebaseio.com",
    projectId: "newchatapp-3345d",
    storageBucket: "newchatapp-3345d.firebasestorage.app",
    messagingSenderId: "429796481737",
    appId: "1:429796481737:web:130cb3211ae42b627e8b18"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


function checkUserAuth() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/v8/firebase.User
            var uid = user.uid;
            // currentUser = user
            userName.value = user.displayName || 'user'
            console.log(user, 'im here');
        } else {
            // User is signed out
            // ...
            console.log('im in the else block');
            window.location.href = './login.html'
        }
    });
}


checkUserAuth()


function updateUsername(ev) {
    let displayName = ev.target.value
    // let displayName = document.getElementById('userName').value
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName
    }).then(() => {
        showSuccess.innerHTML = 'name successfully updated'
        // alert('name successfully updated')
    }).catch((error) => {
        alert(error.message)
        // An error occurred
        // ...
    });

    setTimeout(() => {
        showSuccess.innerHTML = ''
    }, 2000)

}
