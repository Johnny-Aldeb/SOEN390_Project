import { handleGoogleSignIn } from '@/services/googleAuthService';
//import { fetchCalendarEvents } from '@/services/googleCalendarService';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '@/firebase/firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

// Define the structure of a calendar event
interface CalendarEvent {
  id: string;
  summary: string;
  start?: {
    dateTime?: string;
    date?: string;
  };
}

export default function CalendarApp() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [userInfo, setUserInfo] = useState();
  const [requst, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      '525664555174-7uvqaarthvo2d76vpg42oqthf8gnd5ch.apps.googleusercontent.com',
    androidClientId:
      '525664555174-50mr21fk08o7ff51b6lcl6lj2aa2g8t7.apps.googleusercontent.com',
  });

  // useEffect(() => {
  //     if (response?.type === "success") {
  //         const { id_token } = response.params
  //         const credential = GoogleAuthProvider.credential(id_token);
  //         signInWithCredential(auth, credential)
  //     }
  // }, [response])

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Login and Fetch Events" onPress={() => promptAsync()} />
      </View>
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventText}>{item.summary}</Text>
            <Text style={styles.eventText}>
              {item.start?.dateTime || item.start?.date}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the entire screen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#f8f9fa', // Optional: Light background color
    paddingHorizontal: 16, // Add horizontal padding to the container
  },
  buttonContainer: {
    marginBottom: 20, // Space between the button and the list
    padding: 10, // Add padding around the button
    backgroundColor: '#007bff', // Optional: Background color for the button container
    borderRadius: 5, // Rounded corners for the button container
  },
  eventItem: {
    marginVertical: 10, // Space between event items
    alignItems: 'center', // Center text horizontally
  },
  eventText: {
    fontSize: 16, // Adjust font size
    color: '#333', // Optional: Darker text color
  },
});
