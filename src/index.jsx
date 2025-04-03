import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from './firebase/firebaseConfig';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Provider store={store}>
      <App />
    </Provider>
  </FirebaseAppProvider>
);
