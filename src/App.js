import React from 'react';
import Dashboard from './components/Dashboard';

import 'normalize.css';
import style from './styles/App.module.css';

const App = () => {
  return (
    <div className={style.app}>
      <Dashboard />
    </div>
  );
};

export default App;
