import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import configure from 'store/configure';

import axios from 'axios';

import { IntlProvider, addLocaleData } from 'react-intl';
import ko from 'react-intl/locale-data/ko';
import en from 'react-intl/locale-data/en';
import locale from 'locale/locale';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// redux
const store = configure();

// axios
axios.interceptors.request.use(request => {
  console.log('AXIOS REQUEST', request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('AXIOS RESPONSE', response);
  return response;
});

// react-intl
addLocaleData([...ko, ...en]);

const defaultLang = localStorage.getItem('lang') || 'ko';
console.log(`defaultLang:${defaultLang}`);

// react-alert
const options = {
  position: 'bottom center',
  // timeout: 5000,
  timeout: 3000,
  offset: '30px',
  transition: 'scale',
};

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={defaultLang} messages={locale[defaultLang]}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
