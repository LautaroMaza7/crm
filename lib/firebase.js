import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, doc, updateDoc, getDocs, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

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
const auth = getAuth(app);
export { db, auth };

export async function saveLeadToFirebase(lead) {
  const docRef = await addDoc(collection(db, "leads"), lead);
  await updateDoc(docRef, { id: docRef.id }); // Guarda el ID real en el documento
  return docRef.id;
}

export async function updateLeadInFirebase(id, updates) {
  const ref = doc(db, "leads", id);
  await updateDoc(ref, updates);
}

// Migración: asigna el campo 'id' a todos los leads existentes
export async function migrateLeadsSetIdField() {
  const snapshot = await getDocs(collection(db, "leads"));
  const updates = [];
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    if (!data.id || data.id !== docSnap.id) {
      updates.push(updateDoc(doc(db, "leads", docSnap.id), { id: docSnap.id }));
    }
  });
  await Promise.all(updates);
  return updates.length;
}

export async function uploadMockLeads(leads) {
  for (const lead of leads) {
    const docRef = await addDoc(collection(db, "leads"), lead);
    await updateDoc(docRef, { id: docRef.id });
  }
}

export async function uploadMockVendedores(vendedores) {
  for (const vendedor of vendedores) {
    const docRef = await addDoc(collection(db, "vendedores"), vendedor);
    await updateDoc(docRef, { id: docRef.id });
  }
}

// Funciones de autenticación Firebase
export async function loginWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logoutFirebase() {
  return signOut(auth);
}

export function onAuthStateChangedFirebase(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function getLeadById(id) {
  const ref = doc(db, "leads", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { ...snap.data(), id: snap.id };
} 