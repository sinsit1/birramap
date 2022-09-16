import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import LayersIcon from '@mui/icons-material/Layers';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import {useTranslation} from 'react-i18next';

const LayerManagement = ({values, selected, onSelectionChange}) => {
  const {t} = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setmenuOpen] = useState(false);
  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
    setmenuOpen(true);
  };
  const handleClose = () => setmenuOpen(false);

  const handleChange = (e, id) => {
    const checked = e.target.checked;
    onSelectionChange(
      checked ? [...selected, id] : selected.filter(item => item !== id)
    );
  };
  return <Box sx={{position: 'absolute', top: 20, right: 8}}>
    <IconButton onMouseEnter={handleOpen} size='large' sx={{border:1, borderRadius: 1, bgcolor: '#ffffffaa'}}>
      <LayersIcon/>
    </IconButton>
    <Menu open={menuOpen} onClose={handleClose} anchorEl={anchorEl}>
      {
        values.map(({id}) =>
          <MenuItem key={id}>
            <FormControlLabel
              label={t(id)}
              control={
                <Checkbox
                  onChange={(e) => handleChange(e, id)}
                  value={id}
                  name={id}
                  checked={selected.includes(id)}
                  color='secondary'
                  sx={{mr:1, p:0}}
                />
              }
            />
          </MenuItem>)
      }
    </Menu>
  </Box>;
};

LayerManagement.propTypes = {
  values: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectionChange: PropTypes.func,
};

LayerManagement.defaultProps = {};

export default LayerManagement;