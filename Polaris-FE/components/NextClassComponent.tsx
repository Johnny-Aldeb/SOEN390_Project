import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  Card,
  Text,
  Button,
  Menu,
  Divider,
  IconButton,
} from 'react-native-paper';
import dayjs from 'dayjs';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';

const screenWidth = Dimensions.get('window').width;

const NextClassCard = () => {
  const { user, accessToken, promptAsync, logout } = useGoogleAuth();
  const [visible, setVisible] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState('Select a calendar');
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = dayjs();
      const nextClassTime = dayjs().add(1, 'day').hour(15).minute(0).second(0);
      console.log(nextClassTime);

      const remainingSeconds = nextClassTime.diff(now, 'second');

      setTimeLeft(remainingSeconds);

      const totalSeconds = 24 * 60 * 60;
      setProgress(((totalSeconds - remainingSeconds) / totalSeconds) * 100);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);

    return () => clearInterval(interval);
  }, []);

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
              {selectedCalendar}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setSelectedCalendar('Google Calendar');
              closeMenu();
            }}
            title="Google Calendar"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setSelectedCalendar('Apple Calendar');
              closeMenu();
            }}
            title="Apple Calendar"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setSelectedCalendar('Outlook Calendar');
              closeMenu();
            }}
            title="Outlook Calendar"
          />
        </Menu>

        <View style={styles.separator} />

        <Text style={styles.classText}>SOEN 423 Distributed Systems</Text>
        <Text style={styles.locationText}>H-917</Text>
        <Text style={styles.timeText}>11:00 - 13:00</Text>
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
      <Card.Content>
        <Text style={styles.title}>Sign in to see your232 next cl232ass</Text>
        <Button
          //mode="contained"
          onPress={() => {
            console.log('Signing in...');
            promptAsync();
          }}
          //style={styles.button}
        >
          Sign in with Google
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 5,
    margin: 10,
    width: screenWidth * 0.9,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
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
  timerSubText: {
    color: 'white',
    fontSize: 10,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  locationText: {
    color: 'white',
    fontSize: 14,
  },
  timeText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    borderRadius: 5,
  },
});

export default NextClassCard;
