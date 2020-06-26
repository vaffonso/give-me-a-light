import React from 'react';
import CharInput from './CharInput';

import { render, screen, fireEvent } from '@testing-library/react';

const setup = ({ char }) => {
  const utils = render(<CharInput char={char} />);
  const input = utils.getByRole('textbox');
  return {
    input,
    ...utils,
  };
};

describe('Test CharInput component', () => {
  it('should display right chart alert', () => {
    const { input, getByRole } = setup({ char: 'C' });
    fireEvent.change(input, { target: { value: 'c' } });
    expect(getByRole('status').textContent).toContain('✅');
  });

  it('should display wrong char alert', () => {
    const { input, getByRole } = setup({ char: 'B' });
    fireEvent.change(input, { target: { value: 'c' } });
    expect(getByRole('status').textContent).toContain('❌');
  });

  it('should receive capitalized characters', () => {
    const { input } = setup({ char: 'C' });
    fireEvent.change(input, { target: { value: 'c' } });
    expect(input.value).toBe('C');
  });
});
