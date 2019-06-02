import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './components/assets/css/bootstrap.css';
import './components/assets/css/bootstrap-extend.css';
import './components/assets/css/master_style.css';
import './components/assets/css/_all-skins.css';

import {createStore} from 'redux';
import{Provider} from 'react-redux'
import reducers from './stores'

const store = createStore(reducers)

ReactDOM.render(<Provider store={store}><App /></Provider>
  , document.getElementById('root'));

serviceWorker.unregister();
