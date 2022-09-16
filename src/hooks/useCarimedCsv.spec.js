import { renderHook } from '@testing-library/react-hooks/dom';
import {expect} from 'chai';
import useCarimedCsv from './useCarimedCsv';

describe('useCarimedCsv Tests', () => {

  it('pois simple',  () => {
    //GIVEN
    const season = 0;
    const csvString = 'estacio,longitud,latitud,sulfats,data,epoca\nB01,2.19,41.45,177,1998-08-26,0\nB03,2.22,41.53,285,2000-07-20,0';
    const expectedPois = [
      {estacio: 'B01', longitud: 2.19, latitud: 41.45, mediciones: [{sulfats: 177, data: '1998-08-26', year: 1998, epoca: 0}]},
      {estacio: 'B03', longitud: 2.22, latitud: 41.53, mediciones: [{sulfats: 285, data: '2000-07-20', year: 2000, epoca: 0}]},
    ];
    const expectedYears = [1998, 2000];
    //WHEN
    const {result} = renderHook(
      ({csvString}) => useCarimedCsv(csvString, season),
      {
        initialProps: {
          csvString
        }
      });

    expect(result.current.pois).to.deep.equals(expectedPois);
    expect(result.current.years).to.deep.equals(expectedYears);
  });

  it('pois complex', () => {
    //GIVEN
    const season = 0;
    const csvString = 'estacio,longitud,latitud,sulfats,data,epoca\nB01,2.19,41.45,177,1998-08-26,0\nB01,2.19,41.45,178,1999-08-26,0\nB03,2.22,41.53,285,2000-07-20,0';
    const expectedResult = [
      {estacio: 'B01', longitud: 2.19, latitud: 41.45, mediciones: [{sulfats: 177, data: '1998-08-26', year: 1998, epoca: 0}, {sulfats: 178, data: '1999-08-26', year: 1999, epoca: 0}]},
      {estacio: 'B03', longitud: 2.22, latitud: 41.53, mediciones: [{sulfats: 285, data: '2000-07-20', year: 2000, epoca: 0}]}
    ];
    //WHEN
    const {result} = renderHook(
      ({csvString}) => useCarimedCsv(csvString, season),
      {
        initialProps: {
          csvString
        }
      });

    expect(result.current.pois).to.deep.equals(expectedResult);
  });

  it('get features from year', () => {
    //GIVEN
    const season = 0;
    const csvString = 'estacio,longitud,latitud,sulfats,data,epoca\nB01,2.19,41.45,177,1998-08-26,0\nB01,2.19,41.45,178,1999-08-26,0\nB03,2.22,41.53,285,2000-07-20,0';
    const expectedResult = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {
            'estacio': 'B01'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [
              2.19,
              41.45
            ]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'sulfats': 285,
            'data': '2000-07-20',
            'year': 2000,
            'estacio': 'B03',
            'epoca': 0
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [
              2.22,
              41.53
            ]
          }
        }
      ]
    };
    //WHEN
    const {result} = renderHook(
      ({csvString}) => useCarimedCsv(csvString, season),
      {
        initialProps: {
          csvString
        }
      });

    const computedResult = result.current.getFeatures(2000);

    expect(computedResult).to.deep.equals(expectedResult);
  });

  it('get spring chart data from estacio and indicator', () => {
    //GIVEN
    const season = 0;
    const csvString = 'estacio,longitud,latitud,sulfats,epoca,data\nB01,2.19,41.45,177,0,1998-08-26\nB01,2.19,41.45,178,0,1999-08-26\nB03,2.22,41.53,285,1,2000-07-20';
    const expectedResult = {
      values: [
        {year: 1998, value: 177},
        {year: 1999, value: 178}
      ]
    };
    //WHEN
    const {result} = renderHook(
      ({csvString}) => useCarimedCsv(csvString, season),
      {
        initialProps: {
          csvString
        }
      });

    const computedResult = result.current.getChartData('B01', 'sulfats');

    expect(computedResult).to.deep.equals(expectedResult);
  });

  it('get csv from stacio', () => {
    //GIVEN
    const season = 0;
    const csvString = 'estacio,longitud,latitud,sulfats,data,epoca\nB01,2.19,41.45,177,1998-08-26,0\nB01,2.19,41.45,178,1999-08-26,0\nB03,2.22,41.53,285,2000-07-20,0';
    const expectedResult = '"estacio","longitud","latitud","sulfats","data","epoca"\r\n"B01",2.19,41.45,177,"1998-08-26",0\r\n"B01",2.19,41.45,178,"1999-08-26",0';
    //WHEN
    const {result} = renderHook(
      ({csvString}) => useCarimedCsv(csvString, season),
      {
        initialProps: {
          csvString
        }
      });

    const computedResult = result.current.getCsvByStation('B01');

    expect(computedResult).to.deep.equals(expectedResult);
  });
});