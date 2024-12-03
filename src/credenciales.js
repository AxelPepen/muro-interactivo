import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIcpHAFpv-D2VZQz6KaFi33FDdmXL9GMk",
  authDomain: "muro-interactivo-20230999.firebaseapp.com",
  projectId: "muro-interactivo-20230999",
  databaseURL: "https://muro-interactivo-20230999-default-rtdb.firebaseio.com",
  storageBucket: "muro-interactivo-20230999.firebasestorage.app",
  messagingSenderId: "213118678161",
  appId: "1:213118678161:web:657028e874dd000d17bb30"
};

const appFirebase = initializeApp(firebaseConfig);
export const db = getDatabase(appFirebase);
export const auth = getAuth(appFirebase);
export default appFirebase;

