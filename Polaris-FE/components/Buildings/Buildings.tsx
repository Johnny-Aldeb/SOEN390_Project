import React from 'react';
import { Marker } from 'react-native-maps';
import { BUILDING_INFO, Building } from '@/constants/buildingInfo';

export const Buildings: React.FC = () => {
  return (
    <>
      {BUILDING_INFO.map((building: Building) => (
        <Marker
          key={building.Building}
          testID="concordia-building"
          coordinate={{
            latitude: parseFloat(building.Latitude),
            longitude: parseFloat(building.Longitude),
          }}
          title={building.Building_Name}
          description={`${building.Building_Long_Name} - ${building.Address}`}
        />
      ))}
    </>
  );
};
