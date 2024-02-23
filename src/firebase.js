import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyCEiNHhFmSbVl7m5PxxUMDlNAWizKgPmoI",

  authDomain: "upload-bcd8e.firebaseapp.com",

  projectId: "upload-bcd8e",

  storageBucket: "upload-bcd8e.appspot.com",

  messagingSenderId: "794026561238",

  appId: "1:794026561238:web:8e40860757cd58c317c377"

};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
