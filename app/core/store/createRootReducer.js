import { combineReducers } from 'redux';

function createRootReducer(modules) {
  const mapObject = modules.reduce((object, module) => {
    return module.redux
      ? { ...object, [module.key]: module.redux.reducer }
      : object;
  }, {});
  return combineReducers(mapObject);
}

export default createRootReducer;
