import React, { useState } from 'react';

import './App.css';
import { MainPage } from "./mainPage";
import { LoginContainer } from './loginContainer';
import "@blueprintjs/core/lib/css/blueprint.css";

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
  const [ landingPageType, setLandingPageType ] = useState(LandingPageTypes.LOGIN);
  const [ currentUser, setCurrentUser ] = useState<any | undefined>(undefined);
  const handleLoginSuccess = (user: any) => {
    setLandingPageType(LandingPageTypes.MAIN);
    setCurrentUser(user);
  };
  return (
    <div className="App">
      <MainPage chatkitId="paul" />
      {/* {landingPageType === LandingPageTypes.LOGIN ? (
        <LoginContainer onSuccess={handleLoginSuccess} />
      ) : (
        <MainPage user={DUMMY_USER} />
      )} */}
    </div>
  );
}

export default App;
