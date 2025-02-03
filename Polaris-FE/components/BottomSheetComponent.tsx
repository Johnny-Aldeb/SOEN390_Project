import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';

interface BottomSheetComponentProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onFocus: () => void;
  animatedPosition: Animated.SharedValue<number>;
}

export const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  bottomSheetRef,
  onFocus,
  animatedPosition,
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
        <BottomSheetTextInput
          testID="container-bottom-sheet-text-input"
          placeholder={'Search Polaris'}
          style={styles.input}
          onFocus={onFocus}
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
