import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import './main.scss';

const logger = createLogger({ collapsed: true });
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
let store = createStoreWithMiddleware(rootReducer);

render(
<Provider store={store}>
	<App />
</Provider>,document.getElementById('root'));