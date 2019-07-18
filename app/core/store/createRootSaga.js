import { spawn, call } from 'redux-saga/effects';

function createRootSaga(features, modules, onDataLoaded) {
  const featuresWithSagas = features.filter(f => f.createSagas);
  const sagasRegistry = [];
  function* rootSaga() {
    for (const feature of featuresWithSagas) {
      const sagas = yield call(feature.createSagas, modules);
      sagasRegistry[feature.key] = sagas;
      yield spawn(sagas.main);
    }
    onDataLoaded(sagasRegistry);
  }
  return rootSaga;
}

export default createRootSaga;
