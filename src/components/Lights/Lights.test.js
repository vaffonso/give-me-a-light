import React from 'react';
import { render } from '@testing-library/react';

import Lights from './Lights';

const setup = (props) => {
  const utils = render(<Lights {...props} />);
  // const lightGroup = utils.getByRole('group');
  const lights = utils.queryAllByTestId('display-letter');
  return { lights, ...utils };
};

describe('Lights test', () => {
  it('should contain same amount of Light components', () => {
    const { lights } = setup({ availableChars: ['a', 'b'], word: 'ab' });
    expect(lights.length).toBe(2);
  });

  it('should display an alert in case word chars are available', () => {
    const { lights, container } = setup({ availableChars: ['a'], word: 'b' });
    expect(lights.length).toBe(0);
    expect(container.textContent).toBe(
      "Available chars don't match word chars."
    );
  });
});
