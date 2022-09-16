import React, {useEffect, useMemo, useState} from 'react';

import Layout from '../components/Layout';
import SidePanelContent from '../components/SidePanelContent';
import MainContent from '../components/MainContent';

import locals from './../response/locals.json';
import tipus from './../response/tipus.json';
import {parseLocals, parseTipus} from '../utils';

const lcs = locals;
const tps = tipus;

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchText, setSearchText] = useState('');

  const rawTipus = tps;
  const rawLocals = lcs;

  const tipus = rawTipus ? parseTipus(rawTipus) : {};

  useEffect(() => setSelectedCategories(Object.keys(tipus)), [rawTipus]);

  const categories = Object.keys(tipus).map(t => ({
    id: t,
    color: tipus[t][1],
    label: t
  }));
  const sidePanelContent = <SidePanelContent
    categories={categories}
    selectedCategories={selectedCategories}
    onChangeSelectedCategories={setSelectedCategories}
    searchText={searchText}
    setSearchText={setSearchText}
  />;

  const locals = {
    type: 'FeatureCollection',
    features: rawLocals ? parseLocals(rawLocals) : []
  };

  const categoryFilter = feature => selectedCategories.includes(feature.properties.tipus);

  const normalize = string => string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const textFilter = feature => ['nom', 'adreça', 'poblacio', 'descripcio']
    .some(prop => normalize(feature.properties[prop])
      .includes(normalize(searchText)));

  const filteredLocals = useMemo(() => ({
    ...locals,
    features: locals.features.filter(categoryFilter).filter(textFilter)
  }), [selectedCategories, searchText, locals]);

  const mainContent = <MainContent
    tipus={tipus}
    locals={filteredLocals}
  />;

  return <Layout
    sidePanelContent={sidePanelContent}
    mainContent={mainContent}
  />;
};

export default Home;
