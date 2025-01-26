import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
  apiKey: 'AIzaSyDjVE587Cs1MuDhqNeaFfYHxoIq7dwRRlM',
  authDomain: 'polaris-d0f47.firebaseapp.com',
  projectId: 'polaris-d0f47',
  storageBucket: 'polaris-d0f47.firebasestorage.app',
  messagingSenderId: '320433803938',
  appId: '1:320433803938:web:9213d102f71eb3c6863dfb',
  measurementId: 'G-PM917669J6',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(config) : getApps()[0];

// Firestore
export const db = getFirestore(app);

// Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
