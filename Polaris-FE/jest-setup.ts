// jest-setup.ts
import '@testing-library/jest-native/extend-expect';
import 'react-native-reanimated/mock';
import { jest } from '@jest/globals';

jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

jest.mock('expo-router');

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  useBottomTabBarHeight: jest.fn(() => 50),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(() => ({ top: 0, bottom: 20, left: 0, right: 0 })),
}));

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: 'granted' })
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: { latitude: 37.7749, longitude: -122.4194 },
    })
  ),
  watchPositionAsync: jest.fn(
    async (
      _options: object,
      callback: (location: {
        coords: { latitude: number; longitude: number };
      }) => void
    ) => {
      callback({
        coords: { latitude: 37.7749, longitude: -122.4194 },
      });

      return { remove: jest.fn() };
    }
  ),
  Accuracy: {
    Lowest: 1,
    Low: 2,
    Balanced: 3,
    High: 4,
    Highest: 5,
    BestForNavigation: 6,
  },
}));

jest.mock('@gorhom/bottom-sheet', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: View,
    BottomSheetTextInput: View,
    BottomSheetView: View,
  };
});

jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    GestureHandlerRootView: View,
    PanGestureHandler: View,
    TapGestureHandler: View,
    LongPressGestureHandler: View,
    BaseButton: View,
    RectButton: View,
    Directions: {},
    State: {
      UNDETERMINED: 'UNDETERMINED',
      BEGAN: 'BEGAN',
      FAILED: 'FAILED',
      ACTIVE: 'ACTIVE',
      END: 'END',
      CANCELLED: 'CANCELLED',
      PAN: 'PAN',
    },
  };
});

jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    SafeAreaProvider: View,
  };
});

jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: View,
    Marker: View,
    Geojson: View,
  };
});

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  return {
    ...Reanimated,
    useReducedMotion: jest.fn(() => false),
  };
});
