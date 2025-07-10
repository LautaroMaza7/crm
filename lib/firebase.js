import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDqDC7pFKPu_ugezY0u1bwmABgDgOPJ0f4",
    authDomain: "crm-somosluxgroup.firebaseapp.com",
    projectId: "crm-somosluxgroup",
    storageBucket: "crm-somosluxgroup.firebasestorage.app",
    messagingSenderId: "895712165093",
    appId: "1:895712165093:web:e66f42336ad32381c1680c",
    measurementId: "G-9QRNE33GY1"
  };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export async function saveLeadToFirebase(lead) {
  await addDoc(collection(db, "leads"), lead);
} 