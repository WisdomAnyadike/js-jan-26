console.log(firebase);

let button = document.querySelector('.messanger_send_btn')
// Your web app's Firebase configuration
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
console.log(app);

const auth = firebase.auth();

const database = firebase.database();
let chatIndex

// let currentUser 


function checkUserAuth() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/v8/firebase.User
            var uid = user.uid;
            // currentUser = user
            forUserName.innerHTML = user.displayName || 'user'
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


function logUserOut() {
    let canLogout = confirm('are you sure?')
    if (canLogout) {
        auth.signOut().then(() => {
            window.location.href = './login.html'
        }).catch((error) => {
            console.log(error);
            alert(error.message)
        });
    }

}

function sendMessage(params) {

    let messengerInput = document.querySelector('.messanger_input')

    console.log(auth.currentUser.displayName);
    let messageToBeSent = messengerInput.value.trim()

    if (!auth.currentUser) {
        alert('unauthorized')
        return
    }

    if (!auth.currentUser.displayName) {
        alert('please go to settings and update display name')
        return
    }


    if (!messageToBeSent) {
        alert('please enter a message')
        return
    }



    button.innerHTML = `<div class="dot-spinner">
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
</div>`
    button.disabled = true

    database.ref(`chats/${chatIndex}`).set({
        sender: auth.currentUser.displayName,
        time: new Date().toLocaleTimeString(),
        message: messageToBeSent,
        isDeleted: false
    }).then(() => {
        messengerInput.value = ''
    }).catch((err) => {
        alert(err.message)

    }).finally(() => {
        button.innerHTML = `Send`
        button.disabled = false
    })


}

// 02 - 26 - 2026
// let date = new Date()

// function formatDate(date) {
//     let month = date.getMonth() + 1
//     let day = date.getDate()
//     let year = date.getFullYear()

//     function formatMonth() {
//         return month < 10 ? `0${month}` : month
//     }

//     return `${formatMonth()} - ${day} - ${year}`
// }


// console.log(formatDate(date));



function displayMessage() {
    document.querySelector('.messanger_main_chat').innerHTML = 'loading messages...'
    button.disabled = true
    button.style.backgroundColor = 'whitesmoke'

    var starCountRef = database.ref('chats');

    starCountRef.on('value', (snapshot) => {
        const data = snapshot.val() || []
        chatIndex = data.length
        console.log(data);
        document.querySelector('.messanger_main_chat').innerHTML = ''

        data.forEach(({ sender, isDeleted, message, time }, i) => {
            //tenary operator
            // let isMyMessage = sender === auth.currentUser.displayName ? 'right_message' : 'left_message'

            // using a regular if statement

            // let isMyMessage
            // let boolIsMyMessage


            // if (sender === auth.currentUser.displayName) {
            //     isMyMessage = 'right_message'
            //     boolIsMyMessage = true
            // } else {
            //     isMyMessage = 'left_message'
            //     boolIsMyMessage = false
            // }

            let isMyMessage
            if (sender === auth.currentUser.displayName) {
                isMyMessage = true
            } else {
                isMyMessage = false
            }


            console.log(isMyMessage);


            document.querySelector('.messanger_main_chat').innerHTML += `<div ondblclick="deleteMessage(${isMyMessage} , ${i} , ${isDeleted})" class=" user_chat ${isMyMessage ? 'right_message' : 'left_message'} ">
                <div class="user_image"
                    style="background-image: url(https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-02_vll8uv.jpg)">
                </div>

                <div class="message_bubble">
                    <div class="user_info">
                        <div class="user_info_name"> ${sender}</div>
                        <div class="user_info_time"> ${time}</div>
                    </div>

                    <div class="user_original_message">
                       ${isDeleted ? '<i> this message has been deleted </i>' : message}
                    </div>
                </div>
            </div>
`
        })

        button.disabled = false
        button.style.backgroundColor = 'green'

    })

}

displayMessage()


function goToSettings(params) {
    window.location.href = 'settings.html'
}



let chats = [{ sender: 'tayo' }, { sender: 'heritage' }, { sender: 'simi' }, { sender: "tolu" }]
chats.forEach((chat, i, arr) => {
    let isSimi = chat.sender === 'simi' ? 'right_message' : 'left_message'
    console.log(isSimi);



})

function deleteMessage(bool, index, isDeleted) {

    if (!bool) {
        alert('unauthorized')
        return
    }

    if (isDeleted === false) {
        database.ref(`chats/${index}`).update({
            isDeleted: true
        });
    } else {
        alert('this message has already been deleted')
        return
    }


    // console.log(index);

    // bool ? alert('you want to delete') : alert('you cant delete , it is not your message')
}

