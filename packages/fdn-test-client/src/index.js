import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import App from './App';

import './index.scss';
import 'semantic-ui-css/semantic.min.css';

axios.defaults.baseURL = 'http://localhost:3001/api';
axios.defaults.responseType = 'json';

// eslint-disable-next-line
ReactDOM.render(<App />, document.getElementById('root'));
