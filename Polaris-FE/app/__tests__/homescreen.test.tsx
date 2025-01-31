import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../index';

describe('HomeScreen Minimal Test', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Campus')).toBeTruthy();
    expect(getByText('Downtown')).toBeTruthy();
    expect(getByText('Loyola')).toBeTruthy();
  });
});
