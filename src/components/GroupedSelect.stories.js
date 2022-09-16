import React from 'react';
import GroupedSelect from './GroupedSelect';

export default {
  title: 'Common/GroupedSelect',
  component: GroupedSelect
};

const Template = args => <GroupedSelect {...args}/>;

export const Default = Template.bind({});
Default.args = {
  labelSelect: 'Agrupado',
  groups: [
    {
      id: 1,
      labelGroup: 'Category 1',
    },
    {
      id: 2,
      labelGroup: 'Category 2',
    },
    {
      id: 3,
      labelGroup: 'Category 3',
    }
  ],
  indicators: [
    {
      id: '01',
      group: 1,
      label: 'Option 01'
    },
    {
      id: '02',
      group: 1,
      label: 'Option 02'
    },
    {
      id: '03',
      group: 2,
      label: 'Option 03'
    },
    {
      id: '04',
      group: 2,
      label: 'Option 04'
    },
  ],
  selectedOptionId: '02'
};