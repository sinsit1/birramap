import React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const MapLegend = ({fields}) => {
  return <List dense>
    {
      fields.map(({name, type, paint, icon}, index) => {
        const swatch = {
          border: paint ? paint.outlineWidth : undefined,
          borderColor: paint ? paint.outlineColor : undefined,
          bgcolor: paint ? paint.color : undefined,
          borderRadius: type === 'symbol' ? 100 : 0,
          width: type === 'symbol' ? paint.width : 40,
          height: type === 'line' || type === 'symbol' ? paint.width : 25
        };
        return (
          <ListItem key={index} sx={{p:0}}>
            <Stack direction='row' justifyContent='center' alignItems='center' sx={{width: 40, height: 25, mr: 2}}>
              {
                type === 'icon' ? icon :
                  <Box sx={swatch}/>
              }
            </Stack>
            <ListItemText disableTypography sx={{width: '50%'}}>
              <Typography noWrap variant='body1'>{name}</Typography>
            </ListItemText>
          </ListItem>
        );
      })
    }
  </List>;
};

MapLegend.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['line', 'fill', 'symbol', 'icon']).isRequired,
    paint: PropTypes.object,
    icon: PropTypes.element,
  })),
};

MapLegend.defaultProps = {};

export default MapLegend;