import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import grey from '@mui/material/colors/grey';
import InputLabel from '@mui/material/InputLabel';
import {useTranslation} from 'react-i18next';

const GroupedSelect = ({labelSelect, groups, indicators, minWidth, selectedOptionId, onOptionChange}) => {
  const {t} = useTranslation();

  const handleChange = (e) => onOptionChange(selectedOptionId = e.target.value);
  const select = {
    minWidth: minWidth,
    height: 40,
    background: 'background.paper',
    boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.14)',
    '& .paper': {
      border: 3
    }
  };
  const MenuProps = {
    sx: {
      '& .MuiList-root': {
        p: 0,
        bgcolor: 'background.paper',
        color: grey[700],
      },
      '& .MuiListSubheader-root': {
        px: 1,
        py: 0,
        lineHeight: '32px',
        color: 'secondary.main',
        textTransform: 'uppercase',
        bgcolor: 'background.paper'
      },
      '& li': {
        fontSize: 'body1',
      },
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left'
    }
  };
  return <FormControl sx={{mt: 1}}>
    <InputLabel htmlFor="grouped-select" sx={{bgcolor: 'white', pr: 1}}>{labelSelect}</InputLabel>
    <Select
      id='grouped-select'
      label='Grouping'
      disableunderline='true'
      sx={select}
      value={selectedOptionId}
      onChange={handleChange}
      MenuProps={MenuProps}
    >
      {groups.map(({id, labelGroup}, index) => (
        [<ListSubheader key={index}>{labelGroup}</ListSubheader>,
          indicators
            .filter(ind => ind.group === id)
            .map(({id, label}) => <MenuItem dense key={id} value={id}>{t(label)}</MenuItem>)]
      ))}
    </Select>
  </FormControl>;
};

GroupedSelect.propTypes = {
  labelSelect: PropTypes.string,
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    labelGroup: PropTypes.string.isRequired,
  })).isRequired,
  indicators: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    group: PropTypes.number,
    label: PropTypes.string.isRequired
  })).isRequired,
  minWidth: PropTypes.string,
  selectedOptionId: PropTypes.string,
  onOptionChange: PropTypes.func.isRequired
};

GroupedSelect.defaultProps = {
  labelSelect: '',
  minWidth: '200px',
  selectedOptionId: '',
};

export default GroupedSelect;