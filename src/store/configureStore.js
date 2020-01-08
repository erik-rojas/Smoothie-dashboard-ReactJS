import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';

const configStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default),
    );
  }

  return {
    store,
  }
};

const { store } = configStore();

export { store };