import React from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';

interface BottomSheetComponentProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  snapPoints: string[];
  handleInputFocus: () => void;
  animatedPosition: Animated.SharedValue<number>;
}

export const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  bottomSheetRef,
  snapPoints,
  handleInputFocus,
  animatedPosition,
}) => {
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
        <BottomSheetTextInput
          placeholder={'Search Polaris'}
          style={styles.input}
          onFocus={handleInputFocus}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
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
});
