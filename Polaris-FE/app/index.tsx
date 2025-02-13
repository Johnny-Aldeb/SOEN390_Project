import React, { useRef, useState } from 'react';
import MapView, { Region } from 'react-native-maps';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { MapComponent } from '@/components/Map';
import { BottomSheetComponent } from '@/components/BottomSheetComponent/BottomSheetComponent';
import { NavigationButtons } from '@/components/NavigationButtons';
import { useMapLocation } from '@/hooks/useMapLocation';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  handleCurrentLocation,
  handleCampusSelect,
  handleCampusToggle,
} from '@/utils/mapHandlers';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { location, region, setRegion } = useMapLocation();
  const [showCampusOptions, setShowCampusOptions] = useState(false);
  const router = useRouter();

  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<any>(null);

  const toggleAnimation = useSharedValue(0);
  const optionsAnimation = useSharedValue(0);
  const animatedPosition = useSharedValue(0);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <MapComponent mapRef={mapRef} region={region} setRegion={setRegion} />
        <BottomSheetComponent
          bottomSheetRef={bottomSheetRef}
          animatedPosition={animatedPosition}
        >
          <View style={styles.searchContainer}>
            <Pressable onPress={() => router.push('/indoor')}>
              <Ionicons
                name="school-sharp"
                size={24}
                color="white"
                style={styles.icon}
              />
            </Pressable>
            <TextInput
              testID="container-bottom-sheet-text-input"
              placeholder="Search Polaris"
              style={styles.input}
              onFocus={() => bottomSheetRef.current?.snapToIndex(3)}
            />
          </View>
        </BottomSheetComponent>
        <NavigationButtons
          onCampusToggle={() =>
            handleCampusToggle(
              showCampusOptions,
              setShowCampusOptions,
              toggleAnimation,
              optionsAnimation
            )
          }
          onCampusSelect={(selectedRegion: Region) =>
            handleCampusSelect(
              selectedRegion,
              mapRef,
              setShowCampusOptions,
              toggleAnimation,
              optionsAnimation
            )
          }
          onCurrentLocationPress={() => handleCurrentLocation(mapRef, location)}
          animatedPosition={animatedPosition}
          optionsAnimation={optionsAnimation}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '92%',
    alignSelf: 'center',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
});
