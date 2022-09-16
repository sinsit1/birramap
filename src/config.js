
export const INITIAL_VIEWPORT = {
  latitude: 41.38,
  longitude: 2.19,
  zoom: 16,
  bearing: 0,
  pitch: 0,
};

export const MAPSTYLES = [
  {
    label: 'Topográfico',
    thumbnail: 'https://visors.icgc.cat/contextmaps/imatges_estil/icgc_mapa_estandard.png',
    id: 'mapstyles/icgc.json',
    firstTopLayer: 'place-other'
  },
  {
    label: 'PNOA',
    thumbnail: 'mapstyles/pnoa.png',
    id: 'mapstyles/pnoa.json',
    firstTopLayer: 'place-other'
  },
  {
    label: 'Hibrid',
    thumbnail: 'https://openicgc.github.io/img/orto.png',
    id: 'mapstyles/hibrid.json',
    firstTopLayer: 'place-other'
  },
  {
    label: 'Full Dark',
    thumbnail: 'https://openicgc.github.io/img/fulldark.png',
    id: 'mapstyles/fulldark.json',
    firstTopLayer: 'place-other'
  }
];

export const LAYERS = [
  {
    id: 'census_section',
  },
  {
    id: 'neighborhoods'
  }
];

export const INITIAL_MAPSTYLE_URL = MAPSTYLES[0].id;
export const WIDESCREEN_STEP = '900px';
export const DRAWER_WIDTH = '375px';

export const WITHOUT_DATA_COLOR = '#930a93';

const getStyle = (title, match, color, visible = true, width = 10) => ({
  name: title,
  propertyMatch: match,
  type: 'symbol',
  paint: {
    color: color,
    width: width
  },
  visible: visible
});

// FIXME sacar los grupos de la logica de esta app
export const GROUPS = [{
  id: 1,
  labelGroup: ''
}];

export const VARIABLESTOSHOW = [
  'NOM_LOCAL',
  'DIRECCIO',
  'DESCRIPCIO',
  'HORARI',
  'WEB'
];


export const INDICATORS = [

  {
    id: '1',
    group: 1,
    label: 'C_SECTOR',
    featureProperty: 'C_SECTOR',
    unitats: '--',
    leyend: [
      getStyle('Comerç al detall', ['==', 1], '#FFCC00', true, 20),
      getStyle('Serveis', ['==', 2], '#FF6600', true, 20),
      getStyle('Altres', ['==', 3], '#B81609', true, 20),
    ]
  },

  {
    id: '2',
    group: 1,
    label: 'SITUACIO',
    featureProperty: 'SITUACIO',
    unitats: '--',
    leyend: [
      getStyle('Igual', ['==', 'Igual'], '#CCCC00', true, 20),
      getStyle('Canvi Activitat', ['==', 'Canvi Activitat'], '#CC2200', true, 20),
      getStyle('Alta Abans inactiu', ['==', 'Alta Abans inactiu'], '#DDA0DD', true, 20),
    ]
  },
  {
    id: '3',
    group: 1,
    label: 'TIPO',
    featureProperty: 'TIPO',
    unitats: '--',
    leyend: [
      getStyle('Bar', ['==', 'BAR'], '#FFCC00', true, 20),

      getStyle('Cerveceria', ['==', 'CERVECERIA'], '#B81609', true, 20),
    ]
  },

/*
    {
      id: '01',//
      group: 1,
      label: 'Conductivitat',
      featureProperty: 'cond',
      unitats: 'µS/cm',
      leyend: [
        getStyle('Sec', ['==', -2], '#8a8a8a'),
        getStyle('Sense dades', ['==', -1], '#151414', false, 7),
        getStyle('Poc mineralitzades (< 100)', ['<', 100], '#0080ff'),
        getStyle('Molt mineralitzades (100 - 1000)', ['<=', 1000], '#FFCC00'),
        getStyle('Mitjanament minera (> 1000)', ['>', 1000], '#B81609'),
      ]
    },
    {
      id: '02',//
      group: 1,
      label: 'Amoni',
      featureProperty: 'amoni',
      unitats: 'mg N-NH₄⁺/l',
      leyend: [
        getStyle('Sec', ['==', -2], '#8a8a8a'),
        getStyle('Sense dades', ['==', -1], '#151414', false, 7),
        getStyle('Aigües netes (< 0.1)', ['<', 0.1], '#0080ff'),
        getStyle('Risc de toxicitat (0.1 - 0.4)', ['<', 0.5], '#229A00'),
        getStyle('Toxicitat si pH alt (0.5 - 0.9)', ['<', 1], '#FFCC00'),
        getStyle('Toxicitat elevada (1 - 4)', ['<', 4], '#FF6600'),
        getStyle('Toxicitat aguda (> 4)', ['>=', 4], '#B81609')

      ]
    }, {
      id: '03',//
      group: 1,
      label: 'Nitrats',
      featureProperty: 'nitrats',
      unitats: 'mg N-NO₃⁻/l',
      leyend: [
        getStyle('Sec', ['==', -2], '#8a8a8a'),
        getStyle('Sense dades', ['==', -1], '#151414', false, 7),
        getStyle('Aigües netes (< 0.67)', ['<', 0.67], '#0080ff'),
        getStyle('Risc d\'eutrofització (0.67 - 10)', ['<=', 10], '#FFCC00'),
        getStyle('Aigües contaminades (> 10)', ['>', 10], '#B81609'),
      ]
    }, {
      id: '04',
      group: 1,
      label: 'Nitrits',
      featureProperty: 'nitrits',
      unitats: 'mg N-NO₂⁻/l',
      leyend: [
        getStyle('Sec', ['==', -2], '#8a8a8a'),
        getStyle('Sense dades', ['==', -1], '#151414', false, 7),
        getStyle('Aigües netes (< 0.01)', ['<', 0.01], '#0080ff'),
        getStyle('Risc d\'eutrofització (0.01 - 0.1)', ['<=', 0.1], '#FFCC00'),
        getStyle('Aigües contaminades (< 1)', ['>', 0.1], '#B81609'),
      ]
    }, {
      id: '05',//
      group: 1,
      label: 'Fosfats',
      featureProperty: 'fosfats',
      unitats: 'mg P-PO₄³⁻/l',
      leyend: [
        getStyle('Sec', ['==', -2], '#8a8a8a'),
        getStyle('Sense dades', ['==', -1], '#151414', false, 7),
        getStyle('Aigües netes (> 0.03)', ['<', 0.03], '#0080ff'),
        getStyle('Lleu eutrofització (0.03 - 0.09)', ['<', 0.1], '#229A00'),
        getStyle('Eutrofització mitja (0.1 - 0.29)', ['<', 0.3], '#FFCC00'),
        getStyle('Aigües eutrofitzades (0.3 - 0.49)', ['<=', 0.5], '#FF6600'),
        getStyle('Molt eutrofitzades (> 0.5)', ['>=', 0.5], '#B81609'),
      ]
    }, {
      id: '06',
      group: 2,
      label: 'Cabal',
      featureProperty: 'cabal',
      unitats: 'l/s',
      leyend: [
        getStyle('Sec', ['==', -2], '#8a8a8a'),
        getStyle('Sense dades', ['==', -1], '#151414', true, 7),
        getStyle('<= 1', ['<=', 1], '#5CA2D1', true, 5),
        getStyle('<= 10', ['<=', 10], '#5CA2D1', true, 7),
        getStyle('<= 50', ['<=', 50], '#5CA2D1', true, 10),
        getStyle('<= 100', ['<=', 100], '#5CA2D1', true, 15),
        getStyle('<= 150', ['<=', 150], '#5CA2D1', true, 20),
        getStyle('> 50', ['>', 150], '#5CA2D1', true, 25),
      ]
    }, {
      id: '07',
      group: 2,
      label: 'IHF',
      featureProperty: 'ihf',
      unitats: '-',
      leyend: [
        getStyle('Sec', ['==', -2], '#8a8a8a'),
        getStyle('Sense dades', ['==', -1], '#151414', false, 7),
        getStyle('Hàbitat empobrit (> 40)', ['<', 40], '#B81609'),
        getStyle('Hàb. amb deficiències (60 - 40)', ['<=', 60], '#FFCC00'),
        getStyle('Hàb. ben construït (> 60)', ['>', 60], '#0080ff'),

      ]
    }, {
      id: '08',
      group: 3,
      label: 'QBR',
      featureProperty: 'qbr',
      unitats: '-',
      leyend: [
        getStyle('Sec', ['==', -2], '#8a8a8a', false, 10),
        getStyle('Sense dades', ['==', -1], '#151414', false, 7),
        getStyle('Molt bona (> 90)', ['>', 90], '#0080ff'),
        getStyle('Bona (75 - 90)', ['>=', 75], '#229A00'),
        getStyle('Mediocre (55 - 70)', ['>=', 55], '#FFCC00'),
        getStyle('Dolenta (30 - 50)', ['>=', 30], '#FF6600'),
        getStyle('Pèssima (< 25)', ['<=', 25], '#B81609'),
      ]
    }, {
      id: '09',
      group: 3,
      label: 'IBMWP',
      featureProperty: 'ibmwp_rang',
      unitats: '-',
      leyend: [
        getStyle('Sec', ['==', -2], '#8a8a8a'),
        getStyle('Sense dades', ['==', -1], '#151414', false, 7),
        getStyle('Molt bona', ['==', 1], '#0080ff', true),
        getStyle('Bona', ['==', 2], '#229A00'),
        getStyle('Mediocre', ['==', 3], '#FFCC00'),
        getStyle('Dolenta', ['==', 4], '#FF6600'),
        getStyle('Pèssima', ['==', 5], '#B81609'),
      ]
    }, {
      id: '10',
      group: 3,
      label: 'Ecostrimed',
      featureProperty: 'ecostrimed',
      unitats: '-',
      leyend: [
        getStyle('Sec', ['==', -2], '#8a8a8a'),
        getStyle('Sense dades', ['==', -1], '#151414', false, 7),
        getStyle('Molt bo (1)', ['==', 1], '#0080ff'),
        getStyle('Bo (2)', ['==', 2], '#229A00'),
        getStyle('Moderat (3)', ['==', 3], '#FFCC00'),
        getStyle('Mediocre (4)', ['==', 4], '#FF6600'),
        getStyle('Pèssim (5)', ['==', 5], '#B81609'),
      ]
    }, {
      id: '11',
      group: 2,
      label: 'Estat Aquàtic',
      featureProperty: 'AqSt',
      unitats: '-',
      leyend: [
        getStyle('Sec', ['==', -2], '#8a8a8a', false, 10),
        getStyle('Sense dades', ['==', -1], '#151414', false, 7),
        getStyle('Hyperheic', ['==', 1], '#1616A2'),
        getStyle('Eurheic', ['==', 2], '#3474B2'),
        getStyle('Oligorheic', ['==', 3], '#6AAAD5'),
        getStyle('Arheic', ['==', 4], '#CBC446'),
        getStyle('Hyporheic', ['==', 5], '#A2734A'),
        getStyle('Edaphic', ['==', 6], '#613B16'),
      ]
    }*/
];
