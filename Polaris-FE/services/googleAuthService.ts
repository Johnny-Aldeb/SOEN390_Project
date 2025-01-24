import { auth, provider } from '@/firebase/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential) {
      throw new Error('Failed to retrieve credential');
    }
    const accessToken = credential.accessToken;

    console.log('Access Token:', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error during sign-in:', error);
  }
};
