import React from 'react';
import LightBulb from './LightBulb';

import { render } from '@testing-library/react';

const setup = (props) => {
  const utils = render(<LightBulb {...props} />);
  const light = utils.queryByTestId('display-letter');
  return { light, ...utils };
};

describe('Light tests', () => {
  it('should display the received letter', () => {
    const { light } = setup();
    expect(light).toBeNull(); // it doesn't exist
  });

  it('should display the capitalized letter received', () => {
    const { light } = setup({ char: 'a' });
    expect(light.textContent).toBe('A');
  });

  it('should contain class to lighten up letter', () => {
    const { light, debug } = setup({ char: 'b', lightenUp: true });
    expect(light.classList.contains('lightened')).toBe(true);
  });
});
