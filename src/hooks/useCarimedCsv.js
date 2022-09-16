import {useCallback, useEffect, useState} from 'react';
import CSV from 'comma-separated-values';

const initialState = {
  csvArray: [],
  pois: [],
  years: []
};

const useCarimedCsv = (csvString, season) => {
  const [state, setState] = useState(initialState);
  const selectedSeason = parseInt(season);
  useEffect(() => {
    if (csvString) {
      const csvArray = new CSV(csvString, {header: true}).parse()
        .filter(item => item.epoca === selectedSeason);
      const pois = csvArray
        .reduce((acc, cur) => {
          const {estacio, longitud, latitud, data, ...rest} = cur;
          const year = new Date(data).getFullYear();
          const existingObject = acc.find(poi => poi.estacio === cur.estacio);
          return existingObject ?
            [
              ...acc.filter(poi => poi.estacio !== cur.estacio),
              {...existingObject, mediciones: [...existingObject.mediciones, {...rest, data, year}]}
            ] :
            [
              ...acc,
              {estacio, longitud, latitud, mediciones: [{...rest, data, year}]}
            ];
        }, []);

      const years = Array.from(new Set(csvArray.map(registry => new Date(registry.data).getFullYear()))).sort();

      setState({csvArray, pois, years});
    } else {
      setState(initialState);
    }
  }, [csvString, season]);

  const getFeatures = useCallback((year) => ({
    type: 'FeatureCollection',
    features: state.pois
      .map(poi => ({
        type: 'Feature',
        properties: {
          ...poi.mediciones
            .filter(medicio => medicio.epoca === selectedSeason)
            .find(medicio => medicio.year === year),
          estacio: poi.estacio
        },
        geometry: {
          type: 'Point',
          coordinates: [poi.longitud, poi.latitud]
        }
      }))
  }), [state.pois]);

  const getChartData = useCallback((estacio, indicator) => ({
    values: state.pois
      .find(poi => poi.estacio === estacio)
      .mediciones
      .filter(med => med.epoca === selectedSeason)
      .map(({year, [indicator]: value}) => ({year, value: value}))
  }), [state.pois]);

  const getCsvByStation = useCallback((estacio) => {
    const filteredData = state.csvArray
      .filter(row => row.estacio === estacio)
      .filter(row => row.epoca === selectedSeason);
    return new CSV(filteredData, {header: true}).encode();
  }, [state]);

  return {
    ...state,
    getFeatures,
    getChartData,
    getCsvByStation
  };
};

export default useCarimedCsv;