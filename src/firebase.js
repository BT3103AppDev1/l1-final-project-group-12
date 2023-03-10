import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyBNjGI_Jk7uxOz0VL1LRAOs3pEOFdXcjW4",
    authDomain: "democpp-12068.firebaseapp.com",
    projectId: "democpp-12068",
    storageBucket: "democpp-12068.appspot.com",
    messagingSenderId: "853285459041",
    appId: "1:853285459041:web:fd69162ec89e8e71830620"
  };

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;