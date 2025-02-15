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
import Constants from 'expo-constants';
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserCredential | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: Constants.expoConfig?.extra?.iosClientId,
    androidClientId: Constants.expoConfig?.extra?.androidClientId,
    scopes: [
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/calendar.events.readonly',
    ],
    extraParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
  });

  const getStoredValue = async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error retrieving ${key} from storage:`, error);
      return null;
    }
  };

  const setStoredValue = async (key: string, value: string | null) => {
    try {
      if (value) {
        await AsyncStorage.setItem(key, value);
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      throw new Error(`Error storing ${key}`);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getStoredValue('@user');
      const storedAccessToken = await getStoredValue('@access_token');
      const storedRefreshToken = await getStoredValue('@refresh_token');

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedAccessToken) setAccessToken(storedAccessToken);
      if (storedRefreshToken) setRefreshToken(storedRefreshToken);
    };

    loadUser();
  }, [response]);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token, access_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(async authUser => {
          setUser(authUser);
          setAccessToken(access_token || null);

          await setStoredValue('@user', JSON.stringify(authUser));
          await setStoredValue('@access_token', access_token);

          if (response.authentication?.refreshToken) {
            setRefreshToken(response.authentication.refreshToken);
            await setStoredValue(
              '@refresh_token',
              response.authentication.refreshToken
            );
          }
        })
        .catch(error => console.error('Error signing in with Google:', error));
    }
  }, [response]);

  const refreshAccessToken = async () => {
    if (!refreshToken) {
      console.warn('No refresh token available.');
      return null;
    }

    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id:
            Platform.OS === 'ios'
              ? Constants.expoConfig?.extra?.iosClientId
              : Constants.expoConfig?.extra?.androidClientId,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }).toString(),
      });

      const data = await response.json();

      if (data.access_token) {
        setAccessToken(data.access_token);
        await setStoredValue('@access_token', data.access_token);
        console.log('🔄 Access token refreshed.');
        return data.access_token;
      } else {
        console.error('❌ Failed to refresh access token:', data);
        return null;
      }
    } catch (error) {
      console.error('❌ Error refreshing access token:', error);
      return null;
    }
  };

  useEffect(() => {
    if (!accessToken) return;

    const refreshInterval = setInterval(
      () => {
        refreshAccessToken();
      },
      55 * 60 * 1000
    ); // Every 55 minutes

    return () => clearInterval(refreshInterval);
  }, [accessToken]);

  const logout = async () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);

    await setStoredValue('@user', null);
    await setStoredValue('@access_token', null);
    await setStoredValue('@refresh_token', null);
  };
  return { user, accessToken, refreshAccessToken, promptAsync, logout };
}
