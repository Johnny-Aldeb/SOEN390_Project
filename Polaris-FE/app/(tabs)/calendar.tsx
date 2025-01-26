import { StyleSheet, View, Button, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { useGoogleCalendars } from '@/hooks/useGoogleCalendars';
import { useGoogleNextEvent } from '@/hooks/useGoogleNextEvent';
import { useState } from 'react';

export default function CalendarScreen() {
  const [selectedCalendar, setSelectedCalendar] = useState<string | null>(null);
  const { accessToken, logout, user, promptAsync } = useGoogleAuth();
  const {
    calendars = [],
    error: calendarError,
    isLoading: calendarIsLoading,
  } = useGoogleCalendars(accessToken);
  const {
    nextEvent,
    error: nextEventError,
    isLoading: nextEventIsLoading,
  } = useGoogleNextEvent(accessToken, selectedCalendar);

  const formatDateTime = (isoString: string): string => {
    if (!isoString) return 'Unknown time';
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    }).format(date);
  };

  if (!user) {
    return (
      <ThemedView style={styles.container}>
        <Button title="Login with Google" onPress={() => promptAsync()} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome, {user.user.displayName}!</ThemedText>
      <ThemedText type="default">Email: {user.user.email}</ThemedText>
      <Button title="Logout" onPress={logout} />

      {/* Calendar Picker */}
      {calendarIsLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : calendars.length > 0 ? (
        <Picker
          selectedValue={selectedCalendar}
          onValueChange={itemValue => setSelectedCalendar(itemValue)}
          style={styles.picker}
        >
          {calendars.map(calendar => (
            <Picker.Item
              key={calendar.id}
              label={calendar.summary}
              value={calendar.id}
            />
          ))}
        </Picker>
      ) : (
        <ThemedText style={styles.noCalendars}>
          No calendars available
        </ThemedText>
      )}

      {/* Next Event */}
      {nextEventIsLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : nextEvent ? (
        <View style={styles.eventContainer}>
          <ThemedText type="title">Next Event</ThemedText>
          <ThemedText>Title: {nextEvent.summary}</ThemedText>
          <ThemedText>
            Start: {formatDateTime(nextEvent.start?.dateTime || '')}
          </ThemedText>
          <ThemedText>
            End: {formatDateTime(nextEvent.end?.dateTime || '')}
          </ThemedText>
          <ThemedText>
            Location: {nextEvent.location || 'No location provided'}
          </ThemedText>
        </View>
      ) : (
        <ThemedText style={styles.noEvents}>No upcoming events.</ThemedText>
      )}

      {/* Error Messages */}
      {calendarError && (
        <ThemedText style={styles.errorText}>Error: {calendarError}</ThemedText>
      )}
      {nextEventError && (
        <ThemedText style={styles.errorText}>
          Error: {nextEventError}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 100,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    marginVertical: 5,
    backgroundColor: '#eaeaea',
    borderRadius: 2,
  },
  eventContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Shadow for Android
  },
  noCalendars: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: '#888',
  },
  noEvents: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: '#888',
  },
  errorText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: 'red',
  },
});
