import React, { useEffect } from 'react';
import API from './services/api';

const App = () => {
  useEffect(() => {
    // Test API request
    API.get('/')
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }, []);

  return <div>Welcome to Reading Tracker</div>;
};

export default App;
