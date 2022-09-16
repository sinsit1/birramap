import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {VARIABLESTOSHOW} from '../config';

const PopupInfo = ({feature}) => {

  const card = {
    maxWidth: 318,
    m: 0,
    p: 0
  };

  return <Card elevation={10} sx={card}>
    <CardMedia
      component='img'
      height='150'
      image={feature.properties.FOTO ? `photos/${feature.properties.FOTO}` : 'photos/noPhoto.jpg'}
    />
    <CardContent sx={{py: 1}}>
      <Box display='flex' flexWrap='wrap'>
        {
          VARIABLESTOSHOW.map((variable) => (
            <Box display='flex' justifyContent='flex-start' key={variable} sx={{mr: 0, minWidth: 143}}>
              {/* <Typography variant='caption' sx={{mr: 1}}>{t(variable).toUpperCase()}</Typography>*/}
              <Typography variant='caption' sx={{mr: 1.15, color: '#505050'}}>
                {
                  variable === 'DIRECCIO' ? `${feature.properties.TIPUS_VIA} ${feature.properties.DIRECCIO} ${feature.properties.NUM_DIREC}`
                    :
                    feature.properties[variable] &&
                    (feature.properties[variable] === -1 || feature.properties[variable] === -2)
                      ? //Render '-' in empty values
                      '-'
                      : feature.properties[variable] //Integers without decimals

                }
              </Typography><br/>
            </Box>
          ))
        }
      </Box>
    </CardContent>
  </Card>;
}
;

PopupInfo.propTypes = {
  feature: PropTypes.object.isRequired,
};

export default PopupInfo;