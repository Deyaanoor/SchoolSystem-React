import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from './firebase/firebaseConfig';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';  // استيراد ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // استيراد الـ CSS الخاصة بـ Toastify

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Provider store={store}>
      <App />
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={true} 
        pauseOnHover={true} 
      />
    </Provider>
  </FirebaseAppProvider>
);
