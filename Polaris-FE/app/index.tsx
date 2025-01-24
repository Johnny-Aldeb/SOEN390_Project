import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import MapView, { Region } from 'react-native-maps';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { SvgXml } from 'react-native-svg';

const mySymbolXML = `
<svg width="74" height="73" viewBox="0 0 74 73" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.63977 39.7246L33.3976 39.8711C34.0324 39.8711 34.2277 40.0664 34.2277 40.6523L34.3253 67.2637C34.3253 73.5625 41.9914 75.1738 44.8722 68.875L72.5089 9.20702C75.341 3.05472 70.4582 -1.04688 64.5011 1.68752L4.44247 29.4707C-1.02625 31.9609 0.0479712 39.6758 6.63977 39.7246Z" fill="white"/>
</svg>
`;

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const DOWNTOWN: Region = {
  latitude: 45.49563786119324,
  longitude: -73.5792038886834,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const LOYOLA: Region = {
  latitude: 45.458425391521686,
  longitude: -73.638868510132,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function HomeScreen() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [region, setRegion] = useState<Region | undefined>(undefined);
  const [showCampusOptions, setShowCampusOptions] = useState(false);
  const [currentSheetIndex, setCurrentSheetIndex] = useState(1);

  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const toggleAnimation = useSharedValue(0);
  const optionsAnimation = useSharedValue(0);
  const buttonsAnimation = useSharedValue(1);

  // Add ref for the bottom sheet's position
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
      // 1. Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // 2. Start watching position
      subscriber = await Location.watchPositionAsync(
        {
          // Update options (tweak as needed):
          accuracy: Location.Accuracy.High,
          timeInterval: 0, // Minimum time (ms) between updates
          distanceInterval: 0, // Minimum change (m) between updates
        },
        newLocation => {
          // Callback gets fired on each update
          const { latitude, longitude } = newLocation.coords;
          setLocation({ latitude, longitude });

          // Optionally update the Map region
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          });
        }
      );
    })();

    // 3. Cleanup on unmount or re-render
    return () => {
      if (subscriber) {
        subscriber.remove(); // Stop watching
      }
    };
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    setCurrentSheetIndex(index);
    // Hide buttons when sheet is at index 3 instead of 2
    buttonsAnimation.value = withTiming(index === 3 ? 0 : 1, { duration: 1 });
  }, []);

  const snapPoints = useMemo(() => ['15%', '50%', '92%'], []);

  const handleInputFocus = () => {
    bottomSheetRef.current?.snapToIndex(3);
  };

  const handleCurrentLocationPress = () => {
    if (!location) return;
    // Animate the map to the latest coords in state
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

  // Update buttonsStyle to position buttons at the same height as initial sheet position
  const buttonsStyle = useAnimatedStyle(() => {
    // Use fixed values based on our known snap points (15%, 50%, 92%)
    const startFadeHeight = 300; // Approximate height at 50%
    const endFadeHeight = 200; // Approximate height at 80%

    const opacity = interpolate(
      animatedPosition.value,
      [startFadeHeight, endFadeHeight],
      [1, 0], // Keep 1 to 0 for fade out while expanding
      'clamp'
    );

    return {
      transform: [
        {
          translateY: animatedPosition.value,
        },
      ],
      opacity,
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <MapView
          ref={mapRef}
          userInterfaceStyle="dark"
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={setRegion}
          showsUserLocation
          showsCompass
          tintColor="#A83B4A"
        />
        <BottomSheet
          index={1}
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={snapPoints}
          backgroundStyle={{
            backgroundColor: 'rgba(34, 34, 34, 0.992)',
          }}
          handleIndicatorStyle={{ backgroundColor: '#5E5F62' }}
          animatedPosition={animatedPosition}
        >
          <BottomSheetView style={styles.contentContainer}>
            <BottomSheetTextInput
              placeholder={'Search Polaris'}
              style={styles.input}
              onFocus={handleInputFocus}
            />
          </BottomSheetView>
        </BottomSheet>
        <Animated.View style={[styles.buttonsWrapper, buttonsStyle]}>
          <View>
            <Animated.View style={[styles.downtownOption, optionsStyle]}>
              <TouchableOpacity
                style={[styles.campusOption, styles.downtownButton]}
                onPress={() => handleCampusSelect(DOWNTOWN)}
              >
                <Text style={styles.campusButtonText}>Downtown</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.loyolaOption, optionsStyle]}>
              <TouchableOpacity
                style={styles.campusOption}
                onPress={() => handleCampusSelect(LOYOLA)}
              >
                <Text style={styles.campusButtonText}>Loyola</Text>
              </TouchableOpacity>
            </Animated.View>

            <AnimatedTouchableOpacity
              style={styles.toggleButton}
              onPress={handleCampusToggle}
            >
              <Text style={styles.toggleButtonText}>Campus</Text>
            </AnimatedTouchableOpacity>
          </View>

          <AnimatedTouchableOpacity
            style={styles.toggleButton}
            onPress={handleCurrentLocationPress}
          >
            <SvgXml xml={mySymbolXML} width={16} height={16} />
          </AnimatedTouchableOpacity>
        </Animated.View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  toggleContainer: {
    alignItems: 'flex-start',
  },
  currentContainer: {
    alignItems: 'flex-end',
  },
  toggleButton: {
    backgroundColor: 'rgba(34, 34, 34, 0.992)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  campusOptions: {
    marginBottom: 8,
    backgroundColor: 'rgba(34, 34, 34, 0.992)',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'absolute',
    bottom: '100%',
    left: 0,
  },
  campusButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  campusButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sheetText: {
    color: 'white',
  },
  input: {
    width: '92%',
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
  buttonsWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '100.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  campusOption: {
    backgroundColor: 'rgba(34, 34, 34, 0.992)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  downtownButton: {
    minWidth: 113,
  },
  downtownOption: {
    position: 'absolute',
    left: 0,
    bottom: 90,
  },
  loyolaOption: {
    position: 'absolute',
    left: 0,
    bottom: 45,
  },
});
