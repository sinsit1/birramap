import React, {useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import Map from '@geomatico/geocomponents/Map';
import {Popup} from 'react-map-gl';

import {styled} from '@mui/styles';

import MiniPopup from './MiniPopup';
import PopupInfo from './PopupInfo';

import {INDICATORS, INITIAL_VIEWPORT, WITHOUT_DATA_COLOR} from '../config';

const CustomPopup = styled(Popup)({
  '& .mapboxgl-popup-content': {
    padding: 0
  }
});

const MapView = ({style, features, indicator, selectedLayers}) => {

  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [featureClicked, setFeatureClicked] = useState(undefined);
  const [featureHovered, setFeatureHovered] = useState();

  useEffect(() => {
    featureClicked &&
    setFeatureClicked(features.features.find(feat => feat.properties.id === featureClicked.properties.id));
  }, [features]);

  useEffect(() => {
    featureHovered &&
    setFeatureHovered(features.features.find(feat => feat.properties.id === featureHovered.properties.id));
  }, [features]);

  const sources = useMemo(() => ({
    carimed: {
      type: 'geojson',
      data: features
    },
    neighborhoods: {
      type: 'geojson',
      data: 'carto/barris4326.geojson',
    },
    census_section: {
      type: 'geojson',
      data: 'carto/seccio_censal4326.geojson',
    },
  }), [features]);

  const layers = useMemo(() => (indicator ? [
    {
      'id': 'neighborhoods',
      'source': 'neighborhoods',
      'type': 'line',
      'layout': {
        'visibility': selectedLayers.includes('neighborhoods') ? 'visible' : 'none'
      },
      'paint': {
        'line-color': '#FF5733',
        'line-opacity': 0.3,
        'line-width': 2,
      },
    },
    {
      'id': 'census_section',
      'source': 'census_section',
      'type': 'line',
      'layout': {
        'visibility': selectedLayers.includes('census_section') ? 'visible' : 'none'
      },
      'paint': {
        'line-color': '#4e4c4c',
        'line-opacity': 0.3,
        'line-width': 1,
      },
    },
    {
      'id': 'carimed',
      'source': 'carimed',
      'type': 'circle',
      'maxzoom': 20,
      'paint': {
        'circle-color': [
          'case',
          ['has', indicator.featureProperty], [
            'case',
            ...indicator.leyend
              .flatMap(entry =>
                [[entry.propertyMatch[0], ['get', indicator.featureProperty], entry.propertyMatch[1]], entry.paint.color]),
            WITHOUT_DATA_COLOR],
          WITHOUT_DATA_COLOR
        ],
        'circle-radius': [
          'case',
          ['has', indicator.featureProperty], [
            'case',
            ...indicator.leyend
              .flatMap(entry =>
                [[entry.propertyMatch[0], ['get', indicator.featureProperty], entry.propertyMatch[1]], entry.paint.width / 2]),
            0],
          0
        ],
        'circle-stroke-color': '#FFFFFF',
        'circle-stroke-width': [
          'case',
          ['has', indicator.featureProperty], [
            'case',
            ['==', ['get', indicator.featureProperty], -1], 0, 1.5
          ], 0
        ]
      },
    },

  ] : []), [indicator, selectedLayers]);

  const handleOnClick = (e) => setFeatureClicked(e.features ? e.features[0] : undefined);
  const handleHover = (e) => setFeatureHovered(e.features ? e.features[0] : undefined);

  return <>
    {features &&
      <Map
        mapStyle={style}
        viewport={viewport}
        onViewportChange={setViewport}
        sources={sources}
        layers={layers}
        interactiveLayerIds={['carimed']}
        onClick={handleOnClick}
        onMouseEnter={handleHover}
        onMouseLeave={() => setFeatureHovered(undefined)}
      >
        {featureClicked &&
          <CustomPopup
            longitude={featureClicked.geometry.coordinates[0]}
            latitude={featureClicked.geometry.coordinates[1]}
            anchor="bottom"
            closeOnClick={false}
            closeButton={false}
          >
            <PopupInfo
              feature={featureClicked}
            />
          </CustomPopup>
        }
        {
          featureHovered && !featureClicked &&
          <CustomPopup
            longitude={featureHovered.geometry.coordinates[0]}
            latitude={featureHovered.geometry.coordinates[1]}
            anchor="bottom"
            closeButton={false}
            closeOnClick={false}
          >
            <MiniPopup
              title={featureHovered.properties.NOM_LOCAL}
              subtitle={featureHovered.properties.N_ACTIVIT}
              value={featureHovered.properties[indicator.featureProperty === 'ibmwp_rang' ? 'ibmwp' : indicator.featureProperty]}
              unitats={INDICATORS.find(ind => ind.featureProperty === indicator.featureProperty).unitats}
            />
          </CustomPopup>
        }
      </Map>
    }
  </>;
};

MapView.propTypes = {
  ...MapView.propTypes,
  features: PropTypes.shape({
    type: PropTypes.string,
    features: PropTypes.array,
    geometry: PropTypes.shape({
      type: PropTypes.string,
      coordinates: PropTypes.array
    })
  }),
  selectedLayers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MapView;