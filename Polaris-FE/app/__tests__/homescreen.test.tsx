import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import HomeScreen from '../index';

describe('HomeScreen Minimal Test', () => {
  it('renders without crashing', async () => {
    render(<HomeScreen />);

    await waitFor(() => {
      expect(screen.getByText('Campus')).toBeTruthy();
      expect(screen.getByText('Downtown')).toBeTruthy();
      expect(screen.getByText('Loyola')).toBeTruthy();
    });
  });
});
