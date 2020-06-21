import React from 'react';
import CharChain from './CharChain';

import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'

const setup = () => {};

describe('CharChain component', () => {
  it('should render without errors', () => {
    const { getByRole, debug } = render(<CharChain />);
    expect(getByRole('group')).toBeTruthy();
  });

  it('should contain the same amount of CharInput components of the string received', () => {
    const props = { word: 'riot' };
    render(<CharChain {...props} />);
    const input = screen.getAllByRole('textbox');
    expect(input.length).toBe(4);
  });

  it('should display message when no word', () => {
    const { debug, getByRole } = render(<CharChain word={null} />);
    const alert = getByRole('alert');
    expect(alert).toBeTruthy();
    expect(alert.textContent).toBe('No word received');
  });
});
