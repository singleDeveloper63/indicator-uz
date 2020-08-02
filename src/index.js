import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { LangueReducer } from './Redux/reducers/LangueReducer';
import 'popper.js';
import { createStore } from 'redux';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router ,Switch} from 'react-router-dom';

const store = createStore(LangueReducer);

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  ,
  document.getElementById('root')
);

serviceWorker.register();

