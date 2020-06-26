import React from 'react';
import WordsRegistered from './WordsRegistered';

import { render } from '@testing-library/react';

describe('words registered', () => {
  it('should render without error', () => {
    const { queryByRole } = render(<WordsRegistered words={[]} />);
    const list = queryByRole('list');
    expect(list).toBeTruthy();
  });

  it('should not render items if no words', () => {
    const { queryAllByRole } = render(<WordsRegistered words={[]} />);
    const listItems = queryAllByRole('listitem');
    expect(listItems.length).toBe(0);
  });

  it('should render 3 items in list when received 3 words', () => {
    const { queryAllByRole } = render(
      <WordsRegistered words={['avocado', 'bananas', 'racquet']} />
    );
    const listItems = queryAllByRole('listitem');
    expect(listItems.length).toBe(3);
  });
});
