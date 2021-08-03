import * as firebase from 'firebase';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyATKJjkfr5vk9LwU5TriSYDGcOQhlId8GA",
    authDomain: "signal-clone-rnative-b0336.firebaseapp.com",
    projectId: "signal-clone-rnative-b0336",
    storageBucket: "signal-clone-rnative-b0336.appspot.com",
    messagingSenderId: "715832264121",
    appId: "1:715832264121:web:969a3989bddf9a7de82268",
    measurementId: "G-4DG1WS1L7X"
  };

  let app;

  if(firebase?.apps?.length === 0) {
        app=firebase.initializeApp(firebaseConfig)
  }
  else {
      app=firebase.app();
  }


  const db=app.firestore();
  const auth=firebase.auth();

  export {db, auth}
