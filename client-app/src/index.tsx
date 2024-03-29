import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './app/layout/styles.css';
import { store, StoreContext } from './app/stores/store';


ReactDOM.render(
  <StoreContext.Provider value={store}> {/* For MobX, which I used as my state manager instead of Redux. */}
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
