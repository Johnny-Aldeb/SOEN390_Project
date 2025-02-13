import React, { useMemo, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import GooglePlacesInput from '@/components/Helper/GooglePlacesInput';
import { MapComponent } from '@/components/Map';
import MapView from 'react-native-maps';
import { Region } from 'react-native-maps';
import { handleLocation } from '@/utils/mapHandlers';

import { useSharedValue } from 'react-native-reanimated';

interface Location {
  name: string;
  latitude: string;
  longitude: string;
}

interface BottomSheetComponentProps {
  onSearchClick: (region: Region) => void;
  bottomSheetRef: React.RefObject<BottomSheet>;
  onFocus: () => void;
  animatedPosition: Animated.SharedValue<number>;
}

export const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  onSearchClick,
  bottomSheetRef,
  onFocus,
  animatedPosition,
}) => {
  const snapPoints = useMemo(() => ['15%', '50%', '93%'], []);
  const [location, setLocation] = useState<Location | null>(null);
  const [clearLocationTrigger, setClearLocationTrigger] = useState(false);

  const handleLocationSelect = (selectedLocation: Location) => {
    const region: Region = {
      latitude: parseFloat(selectedLocation.latitude),
      longitude: parseFloat(selectedLocation.longitude),
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };
    onSearchClick(region);
    console.log('Selected Location:', selectedLocation);
  };

  useEffect(() => {
    console.log('Location:', location);
  }, [location]);

  return (
    <BottomSheet
      index={1}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: 'rgba(34, 34, 34, 0.992)' }}
      handleIndicatorStyle={{ backgroundColor: '#5E5F62' }}
      animatedPosition={animatedPosition}
    >
      <BottomSheetView
        style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}
      >
        {/* "Search Polaris" text input */}
        {/* <BottomSheetTextInput
          testID="container-bottom-sheet-text-input"
          placeholder="Search Polaris"
          style={styles.input}
          onFocus={onFocus}
        /> */}

        {/* Google Places Autocomplete (Search based on input) */}
        <GooglePlacesInput
          setLocation={handleLocationSelect}
          clearTrigger={clearLocationTrigger}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
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
    color: 'white',
  },
  mapContainer: {
    width: '100%',
    height: 2000,
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default BottomSheetComponent;
