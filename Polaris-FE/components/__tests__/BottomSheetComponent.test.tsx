import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetComponent } from '@/components/BottomSheetComponent';
import Animated from 'react-native-reanimated';

describe('BottomSheetComponent', () => {
  const mockBottomSheetRef = React.createRef<BottomSheet>();
  const mockHandleInputFocus = jest.fn();
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
    render(
      <BottomSheetComponent
        bottomSheetRef={mockBottomSheetRef}
        onFocus={mockHandleInputFocus}
        animatedPosition={mockAnimatedPosition}
      />
    );

    const textInput = screen.queryByTestId('container-bottom-sheet-text-input');
    expect(textInput).toHaveProp('placeholder', 'Search Polaris');
  });

  it('calls handleInputFocus when the text input is focused', () => {
    render(
      <BottomSheetComponent
        bottomSheetRef={mockBottomSheetRef}
        onFocus={mockHandleInputFocus}
        animatedPosition={mockAnimatedPosition}
      />
    );

    const textInput = screen.getByTestId('container-bottom-sheet-text-input');
    fireEvent(textInput, 'focus');
    expect(mockHandleInputFocus).toHaveBeenCalledTimes(1);
  });

  it('sets up the BottomSheet with the given snapPoints and animatedPosition', () => {
    render(
      <BottomSheetComponent
        bottomSheetRef={mockBottomSheetRef}
        onFocus={mockHandleInputFocus}
        animatedPosition={mockAnimatedPosition}
      />
    );

    expect(screen.getByTestId('container-bottom-sheet-text-input')).toHaveProp(
      'placeholder',
      'Search Polaris'
    );
  });
});
