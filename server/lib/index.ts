import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = useRuntimeConfig();
// need to be fill
const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost', 8081);// a delete a la fin

export { db };
