import React, { useState, useEffect } from 'react';

import './App.css';
import { MainPage } from "./mainPage";
import { LoginContainer } from './loginContainer';
import "@blueprintjs/core/lib/css/blueprint.css";
import { DIRECT_MUSIC_USER_ID_KEY } from './actions';

enum LandingPageTypes {
  LOGIN = "LOGIN",
  MAIN = "MAIN",
}

const DUMMY_USER = {
  chatkit_id: "paul",
  created_at: "2019-07-08T08:04:02.777Z",
  id: 9,
  name: "paul",
  password_hash: "$2a$10$ZftLz4uw9pUY59au5lIoCuhiTAXjx7zXTujDG/wRuN54kM3ONSJj6",
  updated_at: "2019-07-08T08:04:02.777Z",
};

const App: React.FC = () => {
  // TODO: Store user sessions in the browser (?)
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
