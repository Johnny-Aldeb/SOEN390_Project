import { useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import {
  GoogleAuthProvider,
  signInWithCredential,
  UserCredential,
} from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserCredential | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      '216599357027-3g0cnt7hdct81sacf76msr4jl9k4onfa.apps.googleusercontent.com',
    androidClientId:
      '216599357027-7daau8gu8a76jb8ca6s4hhljc8kee7hv.apps.googleusercontent.com',
    scopes: [
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/calendar.events.readonly',
    ],
  });

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('@user');
      const storedToken = await AsyncStorage.getItem('@access_token');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setAccessToken(storedToken);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token, access_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then(async authUser => {
        setAccessToken(access_token || null);
        setUser(authUser);

        // Save user and token in AsyncStorage
        await AsyncStorage.setItem('@user', JSON.stringify(authUser));
        await AsyncStorage.setItem('@access_token', access_token || '');
      });
    }
  }, [response]);

  const logout = async () => {
    setUser(null);
    setAccessToken(null);
    await AsyncStorage.removeItem('@user');
    await AsyncStorage.removeItem('@access_token');
  };

  return { user, accessToken, promptAsync, logout };
}
