import React from 'react';
import { render } from '@testing-library/react';

import Controller from './Controller';

const setup = (props) => {
  const utils = render(<Controller {...props} />);
  return { ...utils };
};

describe('Controller', () => {
  it('should render start button', () => {
    const { getByRole } = setup();
    const button = getByRole('button');
    expect(button).toBeTruthy();
    expect(button.textContent).toBe('Start');
  });

  //   it('should render level selector', () => {
  //     const { getByRole, queryAllByRole } = setup();
  //     const selector = getByRole('combobox');
  //     expect(selector).toBeTruthy();
  //     const options = queryAllByRole('option');
  //     expect(options.length).toBeGreaterThan(2);
  //   });
});
