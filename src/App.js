import React from 'react';
import './App.css';
import AppRouter from './router/AppRouter';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <AppRouter></AppRouter>
    </Provider>
  );
}

export default App;
