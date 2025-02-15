import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  Card,
  Text,
  Button,
  Menu,
  ActivityIndicator,
} from 'react-native-paper';
import dayjs from 'dayjs';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { useGoogleCalendars } from '@/hooks/useGoogleCalendar';
import { useGoogleNextEvent } from '@/hooks/useGoogleNextEvent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('window').width;

const NextClassCard = () => {
  const [visible, setVisible] = useState(false);
  const [selectedCalendarId, setSelectedCalendarId] = useState<string | null>(
    null
  );
  const [selectedCalendarName, setSelectedCalendarName] =
    useState<string>('Select a calendar');
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  const { user, accessToken, promptAsync } = useGoogleAuth();
  const { data: calendars, isLoading, error, refetch } = useGoogleCalendars();
  const { data: nextevent } = useGoogleNextEvent(
    accessToken,
    selectedCalendarId
  );

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    if (user && accessToken) {
      refetch(); // 🔄 Force calendar reload after sign-in
    }
  }, [user, accessToken, refetch]);

  useEffect(() => {
    if (!nextevent?.start?.dateTime) {
      setTimeLeft(0);
      setProgress(0);
      return;
    }

    const updateTimer = () => {
      const now = dayjs();
      const nextClassTime = dayjs(nextevent?.start?.dateTime);

      const remainingSeconds = nextClassTime.diff(now, 'second');
      setTimeLeft(remainingSeconds > 0 ? remainingSeconds : 0);

      const totalSeconds = nextClassTime.diff(now.startOf('day'), 'second');
      setProgress(
        totalSeconds > 0
          ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100
          : 0
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [nextevent]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return user ? (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.title}>Next Class</Text>

          {/* Circular Timer */}
          <AnimatedCircularProgress
            size={70}
            width={7}
            fill={progress}
            tintColor="#D84343"
            backgroundColor="#555"
          >
            {() => (
              <View style={styles.timer}>
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>

        {/* Dropdown Menu */}
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button
              onPress={openMenu}
              style={styles.menuButton}
              labelStyle={styles.menuText}
            >
              {selectedCalendarName}
            </Button>
          }
        >
          {isLoading ? (
            <ActivityIndicator animating size="small" color="#ffffff" />
          ) : error ? (
            <Menu.Item title="Error loading calendars" disabled />
          ) : calendars && calendars.length > 0 ? (
            calendars.map(calendar => (
              <Menu.Item
                key={calendar.id}
                onPress={() => {
                  setSelectedCalendarId(calendar.id);
                  setSelectedCalendarName(calendar.summary);
                  closeMenu();
                }}
                title={calendar.summary}
              />
            ))
          ) : (
            <Menu.Item title="No calendars available" disabled />
          )}
        </Menu>

        {/* Event Details */}
        {nextevent ? (
          <>
            <View style={styles.separator} />
            <Text style={styles.classText}>{nextevent?.summary}</Text>
            <Text style={styles.locationText}>{nextevent?.location}</Text>
            <Text style={styles.timeText}>
              {dayjs(nextevent?.start?.dateTime).format('hh:mm A')} -{' '}
              {dayjs(nextevent?.end?.dateTime).format('hh:mm A')}
            </Text>
          </>
        ) : (
          <Text style={styles.noEventText}>🚀 No Future Events Found</Text>
        )}
      </Card.Content>

      <Card.Actions>
        <Button
          mode="contained"
          buttonColor="#D84343"
          textColor="white"
          style={styles.button}
        >
          Get Directions
        </Button>
      </Card.Actions>
    </Card>
  ) : (
    <Card style={styles.card}>
      <Card.Content style={styles.centeredContent}>
        <Button
          mode="contained"
          style={styles.signInButton}
          labelStyle={styles.signInText}
          onPress={() => promptAsync()}
        >
          <FontAwesome
            name="google"
            size={20}
            color="white"
            style={styles.googleIcon}
          />
          <Text style={styles.signInText}>Sign in with Google</Text>
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: screenWidth * 0.9,
  },
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  timer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 0,
  },
  menuText: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#B0B0B0',
    marginVertical: 5,
  },
  classText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  locationText: {
    color: '#B0B0B0',
    fontSize: 16,
    marginBottom: 5,
  },
  timeText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  noEventText: {
    color: '#D84343',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    flex: 1,
    borderRadius: 5,
  },
  signInButton: {
    marginTop: 10,
    backgroundColor: '#D84343',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    minWidth: 260, // ✅ Slightly wider button
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: 'row', // ✅ Ensures icon & text align in a row
    alignItems: 'center', // ✅ Center items properly
    justifyContent: 'center', // ✅ Even spacing
  },
  googleIcon: {
    marginRight: 10, // ✅ Adds space between "G" icon and text
  },
  signInText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default NextClassCard;
