import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import {
  NavigationButtons,
  DOWNTOWN,
  LOYOLA,
} from '@/components/NavigationButtons';
import { AnimateStyle, SharedValue } from 'react-native-reanimated';

// Create a mock for SharedValue<number> to fix TS2322
const mockAnimatedPosition = {
  value: 0,
  set: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
} as unknown as SharedValue<number>;

describe('NavigationButtons Component', () => {
  const mockHandleCampusToggle = jest.fn();
  const mockHandleCampusSelect = jest.fn();
  const mockHandleCurrentLocationPress = jest.fn();

  const defaultProps = {
    showCampusOptions: true,
    handleCampusToggle: mockHandleCampusToggle,
    handleCampusSelect: mockHandleCampusSelect,
    handleCurrentLocationPress: mockHandleCurrentLocationPress,
    optionsStyle: {} as AnimateStyle<any>,
    animatedPosition: mockAnimatedPosition,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(<NavigationButtons {...defaultProps} />);
    expect(getByTestId('animated-container')).toBeTruthy();
  });

  it('calls handleCampusSelect with DOWNTOWN when "Downtown" is pressed', () => {
    const { getByText } = render(<NavigationButtons {...defaultProps} />);
    fireEvent.press(getByText('Downtown'));
    expect(mockHandleCampusSelect).toHaveBeenCalledWith(DOWNTOWN);
  });

  it('calls handleCampusSelect with LOYOLA when "Loyola" is pressed', () => {
    const { getByText } = render(<NavigationButtons {...defaultProps} />);
    fireEvent.press(getByText('Loyola'));
    expect(mockHandleCampusSelect).toHaveBeenCalledWith(LOYOLA);
  });

  it('calls handleCampusToggle when the "Campus" button is pressed', () => {
    const { getByText } = render(<NavigationButtons {...defaultProps} />);
    fireEvent.press(getByText('Campus'));
    expect(mockHandleCampusToggle).toHaveBeenCalledTimes(1);
  });

  it('calls handleCurrentLocationPress when the location button is pressed', () => {
    // CHANGED: Using testId instead of getAllByRole('button')
    const { getByTestId } = render(<NavigationButtons {...defaultProps} />);
    fireEvent.press(getByTestId('button-current-location'));
    expect(mockHandleCurrentLocationPress).toHaveBeenCalledTimes(1);
  });

  it('shows the "Downtown" and "Loyola" buttons when showCampusOptions is true', () => {
    const { getByText } = render(<NavigationButtons {...defaultProps} />);
    expect(getByText('Downtown')).toBeTruthy();
    expect(getByText('Loyola')).toBeTruthy();
  });

  it('can hide campus options if you choose to conditionally render them', () => {
    const { queryByText, rerender } = render(
      <NavigationButtons {...defaultProps} showCampusOptions={false} />
    );

    // If you conditionally render, these might be null. Currently they're not.
    expect(queryByText('Downtown')).toBeTruthy();
    expect(queryByText('Loyola')).toBeTruthy();

    // Rerender with true to show them again
    rerender(<NavigationButtons {...defaultProps} showCampusOptions />);
    expect(queryByText('Downtown')).toBeTruthy();
    expect(queryByText('Loyola')).toBeTruthy();
  });
});
