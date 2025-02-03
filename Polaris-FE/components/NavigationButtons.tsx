import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Region } from 'react-native-maps';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { SvgXml } from 'react-native-svg';
import { Downtown, Loyola, locationIcon } from '@/constants/mapConstants';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedView = Animated.createAnimatedComponent(View);

import { SharedValue } from 'react-native-reanimated';

interface NavigationButtonsProps {
  onCampusToggle: () => void;
  onCampusSelect: (region: Region) => void;
  onCurrentLocationPress: () => void;
  optionsAnimation: SharedValue<number>;
  animatedPosition: SharedValue<number>;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onCampusToggle,
  onCampusSelect,
  onCurrentLocationPress,
  optionsAnimation,
  animatedPosition,
}) => {
  const buttonsStyle = useAnimatedStyle(() => {
    const startFadeHeight = 300;
    const endFadeHeight = 200;

    const opacity = interpolate(
      animatedPosition.value,
      [startFadeHeight, endFadeHeight],
      [1, 0],
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

  const optionsStyle = useAnimatedStyle(() => {
    return {
      opacity: optionsAnimation.value,
      transform: [
        { translateY: interpolate(optionsAnimation.value, [0, 1], [20, 0]) },
        { scale: interpolate(optionsAnimation.value, [0, 1], [0.8, 1]) },
      ],
    };
  });

  return (
    <AnimatedView
      testID="animated-container"
      style={[styles.buttonsWrapper, buttonsStyle]}
    >
      <View>
        <AnimatedView style={[styles.downtownOption, optionsStyle]}>
          <TouchableOpacity
            style={[styles.campusOption, styles.downtownButton]}
            onPress={() => onCampusSelect(Downtown)}
          >
            <Text style={styles.campusButtonText}>Downtown</Text>
          </TouchableOpacity>
        </AnimatedView>

        <AnimatedView style={[styles.loyolaOption, optionsStyle]}>
          <TouchableOpacity
            style={styles.campusOption}
            onPress={() => onCampusSelect(Loyola)}
          >
            <Text style={styles.campusButtonText}>Loyola</Text>
          </TouchableOpacity>
        </AnimatedView>

        <AnimatedTouchableOpacity
          style={styles.toggleButton}
          onPress={onCampusToggle}
        >
          <Text testID="button-campus" style={styles.toggleButtonText}>
            Campus
          </Text>
        </AnimatedTouchableOpacity>
      </View>
      <AnimatedTouchableOpacity
        testID="button-current-location"
        style={styles.toggleButton}
        onPress={onCurrentLocationPress}
      >
        <SvgXml xml={locationIcon} width={16} height={16} />
      </AnimatedTouchableOpacity>
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  buttonsWrapper: {
    position: 'absolute',
    left: 14,
    right: 14,
    pointerEvents: 'box-none',
    bottom: '100.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
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
  campusOption: {
    backgroundColor: 'rgba(34, 34, 34, 0.992)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  campusButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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