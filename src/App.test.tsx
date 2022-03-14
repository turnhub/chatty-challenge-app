import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders list of chats', () => {
  render(<App />);
  const linkElement = screen.getByText(/chats/i);
  expect(linkElement).toBeInTheDocument();
});
