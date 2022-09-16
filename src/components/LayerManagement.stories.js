import React from 'react';
import LayerManagement from './LayerManagement';

export default {
  title: 'Common/LayerManagement',
  component: LayerManagement
};

const Template = args => <LayerManagement {...args}/>;

export const Default = Template.bind({});
Default.args = {
  values: [
    {
      id: '1',
      label: 'EDAR'
    },
    {
      id: '2',
      label: 'Rius'
    },
    {
      id: '3',
      label: 'Embassaments'
    },
    {
      id: '4',
      label: 'Provincia'
    },
    {
      id: '5',
      label: 'Conques'
    }
  ],
  selected: ['1', '5']
};