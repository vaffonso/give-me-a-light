import React from 'react';
import CharInput from './CharInput';

import { render, screen, fireEvent } from '@testing-library/react';

describe('Test CharInput component', () => {
  test('Right chart input', () => {
    const props = { char: 'C' };
    render(<CharInput {...props} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'c' } });
    expect(screen.getByRole('status').textContent).toContain('Correct');
  });

  test('Wrong char input', () => {
    render(<CharInput char="B" />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'c' } });
    expect(screen.getByRole('status').textContent).toContain('Wrong');
  });

  it('should not consider case', () => {
    const { debug, getByRole } = render(<CharInput char={'c'} />);
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'c' } });
  });
});
