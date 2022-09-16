import React from 'react';
import YearSlider from './YearSlider';

export default {
  title: 'Common/YearSlider',
  component: YearSlider
};

const Template = args => <YearSlider {...args}/>;

export const Default = Template.bind({});
Default.args = {
  marks: [1979,1980,1997,1998,2005,1982,2019],
  value: 1997
};