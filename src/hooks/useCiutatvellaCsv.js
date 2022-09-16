import {useCallback, useEffect, useState} from 'react';
import CSV from 'comma-separated-values';

const initialState = {
  csvArray: [],
  pois: [],
  years: []
};

const getYearFromStringDDMMYY = (dateString) => new Date(dateString.split('/')[2]).getFullYear();

const useCiutatvellaCsv = (csvString) => {

  const [state, setState] = useState(initialState);
  //const selectedSeason = parseInt(season);
  useEffect(() => {
    if (csvString) {
      const csvArray = new CSV(csvString, {header: true}).parse();
      const pois = csvArray
        .reduce((acc, cur) => {
          let {ID_UNIC: id, LON: longitud, LAT: latitud, DATA: data, ...rest} = cur;

          // fixme borrar esto en cuanto el csv tenga las latitudes y longitudes con puntos en vez de comas
          if (longitud.includes(',')) {
            longitud = longitud.replace(',', '.');
          }
          if (latitud.includes(',')) {
            latitud = latitud.replace(',', '.');
          }
          longitud = parseFloat(longitud);
          latitud = parseFloat(latitud);

          // FIXME SACAR EL AÑO DEL DATA DE UNA FORMA MAS ELEGANTE
          const year = getYearFromStringDDMMYY(data);
          const existingObject = acc.find(poi => poi.id === cur.id);
          return existingObject ?
            [
              ...acc.filter(poi => poi.id !== cur.id),
              {...existingObject, mediciones: {...existingObject.mediciones, ...{...rest, data, year}}}
            ] :
            [
              ...acc,
              {id, longitud, latitud, mediciones: {...rest, data, year}}
            ];
        }, []);

      //FIXME encontrar forma de sacar el year de este string de una forma mas elegante
      const years = Array.from(new Set(csvArray.map(registry => new Date(registry.DATA.split('/')[2]).getFullYear()))).sort();

      setState({csvArray, pois, years});
    } else {
      setState(initialState);
    }
  }, [csvString]);


  const getFeatures = useCallback((year) => ({
    type: 'FeatureCollection',
    features: state.pois.filter(el => el.mediciones.year === year)
      .map(poi => ({
        type: 'Feature',
        properties: {
          ...poi.mediciones,
          id: poi.id
        },
        geometry: {
          type: 'Point',
          coordinates: [poi.longitud, poi.latitud]
        }
      }))
  }), [state.pois]);


  return {
    ...state,
    getFeatures,
  };
};

export default useCiutatvellaCsv;