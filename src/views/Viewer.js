import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useNavigate, useParams} from 'react-router-dom';

import {useTranslation} from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import styled from '@mui/styles/styled';
import Link from '@mui/material/Link';

import BaseMapPicker from '@geomatico/geocomponents/BaseMapPicker';
import ResponsiveHeader from '@geomatico/geocomponents/ResponsiveHeader';
import SidePanel from '@geomatico/geocomponents/SidePanel';
import MapLegend from '@geomatico/geocomponents/MapLegend';


import {DRAWER_WIDTH, INDICATORS, INITIAL_MAPSTYLE_URL, MAPSTYLES, WIDESCREEN_STEP} from '../config';
import SectionTitle from '../components/SectionTitle';
import useFetch from '../hooks/useFetch';
import MapView from '../components/MapView';
import useCiutatvellaCsv from '../hooks/useCiutatvellaCsv';

const MapContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'leftDrawer'
})(({
      theme,
      leftDrawer
    }) => ({
  flexGrow: 1,
  padding: 0,
  position: 'absolute',
  top: theme.mixins.toolbar.minHeight,
  bottom: 0,
  right: 0,
  left: leftDrawer ? DRAWER_WIDTH : 0
}));

const MapViewer = ({
                     selectedStyleId,
                     features,
                     selectedIndicator,
                     getChartData,
                     selectedLayers,
                     setSelectedStyleId,
                     setSelectLayers
                   }) =>
  <>
    <MapView
      style={selectedStyleId}
      features={features}
      indicator={selectedIndicator}
      getChartData={getChartData}
      selectedLayers={selectedLayers}
    />

    <Box sx={{
      position: 'relative',
      bottom: 12,
      display: 'flex'
    }}>
      <BaseMapPicker
        styles={MAPSTYLES}
        selectedStyleId={selectedStyleId}
        onStyleChange={setSelectedStyleId}
      />
    </Box>
    {/*
    <LayerManagement values={LAYERS} selected={selectedLayers} onSelectionChange={setSelectLayers}/>
*/}
  </>;

MapViewer.propTypes = {
  selectedStyleId: PropTypes.string,
  setSelectedStyleId: PropTypes.func,
  features: PropTypes.object,
  selectedIndicator: PropTypes.object,
  onDownloadStationData: PropTypes.func,
  getChartData: PropTypes.func,
  selectedLayers: PropTypes.array,
  setSelectedStyleUrl: PropTypes.func,
  setSelectLayers: PropTypes.func,
};

//STYLES
const leyendStyles = {
  '& .MapLegend-swatch': {
    margin: '2px 8px 2px 0px',
    width: 25,
  },
  '& .MapLegend-text': {
    fontSize: 14,
    color: '#606060'
  }
};

const App = ({simple}) => {
  const {t} = useTranslation();
  const widescreen = useMediaQuery(`(min-width: ${WIDESCREEN_STEP})`, {noSsr: true});

  const [selectedStyleId, setSelectedStyleId] = useState(INITIAL_MAPSTYLE_URL);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const [selectedLayers, setSelectLayers] = useState(['census_section']);
  const {
          year: yearParam,
          indicator: indicatorParam,
        } = useParams();


  const {data: dataBirramap} = useFetch('birramap.csv', false);
  const {
          years,
          getFeatures
        } = useCiutatvellaCsv(dataBirramap);

  const navigate = useNavigate();

  const selectedIndicator = useMemo(() =>
      indicatorParam ?
        INDICATORS.find(ind => ind.featureProperty === indicatorParam) :
        INDICATORS[2],
    [indicatorParam]);

  const selectedIndicatorSortedLeyend = (lastOrderName = 'Sec', penultimateOrderName = 'Sense dades', items = selectedIndicator.leyend.filter(item => item.visible)) => {
    const lastItem = items.filter(item => item.name === lastOrderName);
    const penultimateItem = items.filter(item => item.name === penultimateOrderName);
    const restOfItems = items.filter(item => item.name !== lastOrderName && item.name !== penultimateOrderName);
    return restOfItems.concat(penultimateItem).concat(lastItem);
  };

  const features = yearParam && getFeatures(parseInt(yearParam));

  useEffect(() => {
    if (years.length) {
      const year = yearParam ? parseInt(yearParam) : years[years.length - 1];
      simple ?
        navigate(`/viewer/${selectedIndicator.featureProperty}/${year}`) :
        navigate(`/indicator/${selectedIndicator.featureProperty}/${year}`);
    }
  }, [years]);

  const handleClose = () => setIsSidePanelOpen(!isSidePanelOpen);


  const mapViewerProps = {
    selectedStyleId,
    features,
    selectedIndicator,
    selectedLayers,
    setSelectedStyleId,
    setSelectLayers
  };

  return (
    simple ?
      <MapViewer {...mapViewerProps} /> :
      <>

        <ResponsiveHeader
          title='----'
          logo={null}
          onStartIconClick={widescreen ? undefined : handleClose}
          isStartIconCloseable={isSidePanelOpen}
          sx={{'&.MuiAppBar-root': {zIndex: 1500}}}
        >
        </ResponsiveHeader>
        <SidePanel
          drawerWidth={DRAWER_WIDTH}
          anchor='left'
          isOpen={isSidePanelOpen}
          onClose={handleClose}
          widescreen={widescreen}
        >
          <Box display='flex' flexDirection='column' sx={{height: '93vh'}}>

            <Box>
              <SectionTitle titleKey={t('legend')}/>
              <MapLegend fields={selectedIndicatorSortedLeyend()} sx={leyendStyles}/>
            </Box>
          </Box>
        </SidePanel>
        <MapContent leftDrawer={isSidePanelOpen && widescreen}>
          <MapViewer {...mapViewerProps} />
        </MapContent>
      </>
  );
};

App.propTypes = {
  simple: PropTypes.bool,
};

App.defaultProps = {
  simple: false,
};

export default App;

