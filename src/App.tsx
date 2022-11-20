import React from 'react';
import CheckAuth from './components/CheckAuth';
import FirebaseProvider from './context/FirebaseContext';

function App() {
  return (
    <FirebaseProvider>
      <CheckAuth />
    </FirebaseProvider>
  );
}

export default App;