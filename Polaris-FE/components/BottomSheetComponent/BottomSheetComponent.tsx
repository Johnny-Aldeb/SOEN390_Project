import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';

interface BottomSheetComponentProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  children: React.ReactNode;
  animatedPosition: Animated.SharedValue<number>;
}

export const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  bottomSheetRef,
  animatedPosition,
  children,
}) => {
  const snapPoints = useMemo(() => ['15%', '50%', '93%'], []);

  return (
    <BottomSheet
      index={1}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: 'rgba(34, 34, 34, 0.992)',
      }}
      handleIndicatorStyle={{ backgroundColor: '#5E5F62' }}
      animatedPosition={animatedPosition}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
