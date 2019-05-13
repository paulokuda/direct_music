import React, { useState } from 'react';

import './App.css';
import { MainPage } from "./mainPage";
import { LoginContainer } from './loginContainer';
import { IUser } from './actions';

enum LandingPageTypes {
  LOGIN = "LOGIN",
  MAIN = "MAIN",
}

const App: React.FC = () => {  
  // TODO: Store user sessions in the browser (?)
  const [ landingPageType, setLandingPageType ] = useState(LandingPageTypes.LOGIN);
  const [ currentUser, setCurrentUser ] = useState<IUser | undefined>(undefined);
  const handleLoginSuccess = (user: IUser) => {
    setLandingPageType(LandingPageTypes.MAIN);
    setCurrentUser(user);
  };
  return (
    <div className="App">
      {landingPageType === LandingPageTypes.LOGIN ? (
        <LoginContainer onSuccess={handleLoginSuccess} />
      ) : (
        <MainPage user={currentUser} />
      )}
    </div>
  );
}

export default App;
