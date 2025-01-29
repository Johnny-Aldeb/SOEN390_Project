import React, { useEffect, useMemo, useRef, useState } from 'react';
import MapView, { Region } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

import { MapComponent } from '@/components/Map';
import { BottomSheetComponent } from '@/components/BottomSheetComponent';
import { NavigationButtons } from '@/components/NavigationButtons';

export default function HomeScreen() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [region, setRegion] = useState<Region | undefined>(undefined);
  const [showCampusOptions, setShowCampusOptions] = useState(false);

  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<any>(null);

  const toggleAnimation = useSharedValue(0);
  const optionsAnimation = useSharedValue(0);

  const animatedPosition = useSharedValue(0);

  const handleCampusToggle = () => {
    setShowCampusOptions(!showCampusOptions);
    toggleAnimation.value = withSpring(showCampusOptions ? 0 : 1);
    optionsAnimation.value = withTiming(showCampusOptions ? 0 : 1, {
      duration: 300,
    });
  };

  const handleCampusSelect = (region: Region) => {
    mapRef.current?.animateToRegion(region, 1000);
    setShowCampusOptions(false);
    toggleAnimation.value = withSpring(0);
    optionsAnimation.value = withTiming(0, { duration: 300 });
  };

  const optionsStyle = useAnimatedStyle(() => {
    return {
      opacity: optionsAnimation.value,
      transform: [
        { translateY: interpolate(optionsAnimation.value, [0, 1], [20, 0]) },
        { scale: interpolate(optionsAnimation.value, [0, 1], [0.8, 1]) },
      ],
    };
  });

  useEffect(() => {
    let subscriber: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 0,
          distanceInterval: 0,
        },
        newLocation => {
          const { latitude, longitude } = newLocation.coords;
          setLocation({ latitude, longitude });

          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          });
        }
      );
    })();
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, []);

  const snapPoints = useMemo(() => ['15%', '50%', '92%'], []);

  const handleInputFocus = () => {
    bottomSheetRef.current?.snapToIndex(3);
  };

  const handleCurrentLocationPress = () => {
    if (!location) return;
    mapRef.current?.animateToRegion(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <MapComponent mapRef={mapRef} region={region} setRegion={setRegion} />
        <BottomSheetComponent
          bottomSheetRef={bottomSheetRef}
          snapPoints={snapPoints}
          handleInputFocus={handleInputFocus}
          animatedPosition={animatedPosition}
        />
        <NavigationButtons
          showCampusOptions={showCampusOptions}
          handleCampusToggle={handleCampusToggle}
          handleCampusSelect={handleCampusSelect}
          handleCurrentLocationPress={handleCurrentLocationPress}
          optionsStyle={optionsStyle}
          animatedPosition={animatedPosition}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
