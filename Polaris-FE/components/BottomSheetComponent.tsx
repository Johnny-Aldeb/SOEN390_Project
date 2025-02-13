import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import GooglePlacesInput from '@/components/Helper/GooglePlacesInput';
import { Region } from 'react-native-maps';

interface BottomSheetComponentProps {
  onSearchClick: (region: Region) => void;
  bottomSheetRef: React.RefObject<BottomSheet>;
  animatedPosition: Animated.SharedValue<number>;
}

export const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  onSearchClick,
  bottomSheetRef,
  animatedPosition,
}) => {
  const snapPoints = useMemo(() => ['15%', '50%', '93%'], []);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleLocationSelect = (placeId: string, description: string) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyCIQzQHX5obH2Ev4jIX1qVy5i2zDn8nrYI`
    )
      .then(res => res.json())
      .then(data => {
        if (data.result) {
          const location = {
            name: description,
            latitude: data.result.geometry.location.lat.toString(),
            longitude: data.result.geometry.location.lng.toString(),
          };

          // Update map region
          const region: Region = {
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude),
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          };

          setSearchResults([]); // Clear results after selection
          onSearchClick(region);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <BottomSheet
      index={1}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backgroundStyle={styles.bottomSheet}
      handleIndicatorStyle={styles.handleIndicator}
      animatedPosition={animatedPosition}
    >
      <BottomSheetView style={styles.content}>
        {/* Google Places Input */}
        <GooglePlacesInput setSearchResults={setSearchResults} />

        {/* Search Results */}
        <View style={styles.resultsContainer}>
          {searchResults.map((result, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.searchResult}
                onPress={() =>
                  handleLocationSelect(result.place_id, result.description)
                }
              >
                <Text style={styles.searchResultText}>
                  {result.description}
                </Text>
              </TouchableOpacity>

              {/* Separator Line */}
              {index < searchResults.length - 1 && (
                <View style={styles.separator} />
              )}
            </View>
          ))}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: '#222', // Dark theme
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: {
    backgroundColor: '#5E5F62',
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 10,
    marginBottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  resultsContainer: {
    marginTop: 0,
  },
  searchResult: {
    paddingVertical: 12, // Spacing between results
    paddingHorizontal: 5,
  },
  searchResultText: {
    width: '100%',
    color: 'white',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#5E5F62', // Subtle gray divider
    marginHorizontal: 5,
  },
});

export default BottomSheetComponent;
