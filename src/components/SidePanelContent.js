import React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import SwitchPad from '@geomatico/geocomponents/SwitchPad';
import SearchBox from '@geomatico/geocomponents/SearchBox';

import SectionTitle from './SectionTitle';
import {useTranslation} from 'react-i18next';

const SidePanelContent = ({categories, selectedCategories, onChangeSelectedCategories, searchText, setSearchText}) => {
  const {t} = useTranslation();



  return <Stack sx={{height: '100%'}}>

    <SectionTitle titleKey={t('filtraTexto')}/>
    <SearchBox text={searchText} onTextChange={setSearchText} dense={true} onSearchClick={() => {}} placeholder={t('busca')}/>

    <SectionTitle titleKey={t('filtraCategoria')}/>
    <SwitchPad categories={categories} selected={selectedCategories} onSelectionChange={onChangeSelectedCategories}/>

    <Stack sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexGrow: 2, minHeight: 25}}>
      {/*<Link href="https://geomatico.es" target="_blank" sx={{display: 'flex', alignItems: 'flex-end'}}>
        <img src={Logo_geomatico} width={80} alt="geomatico.es"/>
      </Link>*/}
    </Stack>
  </Stack>;
};

SidePanelContent.propTypes = {
  categories: PropTypes.array,
  selectedCategories: PropTypes.array.isRequired,
  onChangeSelectedCategories: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func.isRequired,
};

export default SidePanelContent;
