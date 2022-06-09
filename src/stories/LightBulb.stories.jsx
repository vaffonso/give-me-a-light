import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LightBulb from '../components/LightBulb/LightBulb';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/LightBulb',
  component: LightBulb,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <LightBulb {...args} />;

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  char: 'a',
  lightenUp: true,
  height: 100,
};
