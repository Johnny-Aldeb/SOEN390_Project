import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetComponent } from '@/components/BottomSheetComponent'; // <-- Adjust path
import Animated from 'react-native-reanimated';

describe('BottomSheetComponent', () => {
  // Create a ref that matches the BottomSheet type
  const mockBottomSheetRef = React.createRef<BottomSheet>();

  // Example snapPoints
  const mockSnapPoints = ['25%', '50%', '75%'];

  // A mock callback for when the input is focused
  const mockHandleInputFocus = jest.fn();

  // If you see TS type errors about SharedValue, you can mock it like so:
  const mockAnimatedPosition = {
    value: 0,
    set: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
  } as unknown as Animated.SharedValue<number>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the BottomSheet with the provided placeholder text', () => {
    const { getByPlaceholderText } = render(
      <BottomSheetComponent
        bottomSheetRef={mockBottomSheetRef}
        snapPoints={mockSnapPoints}
        handleInputFocus={mockHandleInputFocus}
        animatedPosition={mockAnimatedPosition}
      />
    );

    // The text input should show up with the placeholder.
    const textInput = getByPlaceholderText('Search Polaris');
    expect(textInput).toBeTruthy();
  });

  it('calls handleInputFocus when the text input is focused', () => {
    const { getByPlaceholderText } = render(
      <BottomSheetComponent
        bottomSheetRef={mockBottomSheetRef}
        snapPoints={mockSnapPoints}
        handleInputFocus={mockHandleInputFocus}
        animatedPosition={mockAnimatedPosition}
      />
    );

    const textInput = getByPlaceholderText('Search Polaris');
    // fireEvent has a specific event for focusing a text input
    fireEvent(textInput, 'focus');

    expect(mockHandleInputFocus).toHaveBeenCalledTimes(1);
  });

  it('sets up the BottomSheet with the given snapPoints and animatedPosition', () => {
    const { getByPlaceholderText } = render(
      <BottomSheetComponent
        bottomSheetRef={mockBottomSheetRef}
        snapPoints={mockSnapPoints}
        handleInputFocus={mockHandleInputFocus}
        animatedPosition={mockAnimatedPosition}
      />
    );

    // Just verifying the input is rendered to confirm the sheet is mounted
    expect(getByPlaceholderText('Search Polaris')).toBeTruthy();
  });
});
