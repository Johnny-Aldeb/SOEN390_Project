import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Region } from 'react-native-maps';
import Animated, {
  AnimateStyle,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { SvgXml } from 'react-native-svg';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const DOWNTOWN: Region = {
  latitude: 45.49563786119324,
  longitude: -73.5792038886834,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export const LOYOLA: Region = {
  latitude: 45.458425391521686,
  longitude: -73.638868510132,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

import { SharedValue } from 'react-native-reanimated';

interface NavigationButtonsProps {
  showCampusOptions: boolean;
  handleCampusToggle: () => void;
  handleCampusSelect: (region: Region) => void;
  handleCurrentLocationPress: () => void;
  optionsStyle: AnimateStyle<any>;
  animatedPosition: SharedValue<number>;
}

const mySymbolXML = `
<svg width="74" height="73" viewBox="0 0 74 73" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.63977 39.7246L33.3976 39.8711C34.0324 39.8711 34.2277 40.0664 34.2277 40.6523L34.3253 67.2637C34.3253 73.5625 41.9914 75.1738 44.8722 68.875L72.5089 9.20702C75.341 3.05472 70.4582 -1.04688 64.5011 1.68752L4.44247 29.4707C-1.02625 31.9609 0.0479712 39.6758 6.63977 39.7246Z" fill="white"/>
</svg>
`;

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  showCampusOptions,
  handleCampusToggle,
  handleCampusSelect,
  handleCurrentLocationPress,
  optionsStyle,
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
  return (
    <Animated.View
      testID="animated-container"
      style={[styles.buttonsWrapper, buttonsStyle]}
    >
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
          <Text testID="button-campus" style={styles.toggleButtonText}>
            Campus
          </Text>
        </AnimatedTouchableOpacity>
      </View>
      <AnimatedTouchableOpacity
        testID="button-current-location"
        style={styles.toggleButton}
        onPress={handleCurrentLocationPress}
      >
        <SvgXml xml={mySymbolXML} width={16} height={16} />
      </AnimatedTouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
