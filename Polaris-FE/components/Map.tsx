import React from 'react';
import MapView, { Region } from 'react-native-maps';
import { StyleSheet } from 'react-native';

interface MapComponentProps {
  mapRef: React.RefObject<MapView>;
  region: Region | undefined;
  setRegion: (region: Region) => void;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  mapRef,
  region,
  setRegion,
}) => {
  return (
    <MapView
      testID="map-view"
      ref={mapRef}
      style={styles.map}
      initialRegion={region}
      onRegionChangeComplete={setRegion}
      showsUserLocation
      showsCompass
      tintColor="#A83B4A"
    />
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
