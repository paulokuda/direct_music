import React, { useState, useEffect } from 'react';

import './App.css';
import { MainPage } from "./mainPage";
import { LoginContainer } from './loginContainer';
import "@blueprintjs/core/lib/css/blueprint.css";
import { DIRECT_MUSIC_USER_ID_KEY } from './actions';

const App: React.FC = () => {
  const [ currentUser, setCurrentUser ] = useState("");

  useEffect(() => {
    const existingUserId = localStorage.getItem(DIRECT_MUSIC_USER_ID_KEY);
    if (existingUserId != null) {
      setCurrentUser(existingUserId);
    }
  }, []);

  const handleLoginSuccess = (user: string) => {
    setCurrentUser(user);
  };

  return (
    <div className="App">
      {currentUser === "" ? (
        <LoginContainer onSuccess={handleLoginSuccess} />
      ) : (
        <MainPage chatkitId={currentUser} />
      )}
    </div>
  );
}

export default App;
