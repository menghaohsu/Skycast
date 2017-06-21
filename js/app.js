import React from 'react';
import { Match } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './Landing';
import Search from './Search';
import Login from './Login';
import Register from './Register';
import SearchHistory from './SearchHistory';

const App = () => {
  return (
    <Provider store={store}>
      <div className='app'>
        <Match exactly pattern='/' component={Landing} />
        <Match pattern='/search' component={Search} />
        <Match pattern='/login' component={Login} />
        <Match pattern='/register' component={Register} />
        <Match pattern='/searchHistory' component={SearchHistory} />
      </div>
    </Provider>
  );
};

export default App;
