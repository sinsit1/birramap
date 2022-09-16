import React from 'react';
import MapLegend from './MapLegend';
import AddLocationIcon from '@mui/icons-material/AddLocation';

export default {
  title: 'Common/MapLegend',
  component: MapLegend
};

const Template = args => <MapLegend {...args}/>;

export const Default = Template.bind({});
Default.args = {
  fields: [
    {
      'name': 'Mediocre',
      'type': 'symbol',
      'paint': {
        'color': '#B33951',
        'width': 10
      }
    },
    {
      'name': 'Péssim',
      'type': 'symbol',
      'paint': {
        'color': '#0E103D',
        'width': 10
      }
    },
    {
      'name': 'Área de cultivo viable',
      'type': 'fill',
      'paint': {
        'color': '#96c672',
        'outlineColor': '#494949',
        'outlineWidth': 1
      }
    },
    {
      'name': 'Límite de zona seleccionada',
      'type': 'line',
      'paint': {
        'color': '#ce241b',
        'width': 4
      }
    },
    {
      'name': 'Estaciones',
      'type': 'icon',
      'icon': <AddLocationIcon color='primary' sx={{fontSize: 30}}/>
    },
  ]
};