import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import  AsyncStorage  from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA6VoDx8LAf9cl17Ok9n9RxDk0LoF4lyRM",
  authDomain: "travel-schedule-a1f11.firebaseapp.com",
  projectId: "travel-schedule-a1f11",
  storageBucket: "travel-schedule-a1f11.appspot.com",
  messagingSenderId: "468289208254",
  appId: "1:468289208254:web:cd556d9e555d35443903ef",
  measurementId: "G-4XFMXBNYHW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const storage = getStorage(app);
export const db = getFirestore(app);
export const accounts = collection(db,'users');
export const rooms = collection(db,'rooms');
