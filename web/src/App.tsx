import { Routes } from "./routes";

import logoImg from './assets/logo.svg';

import './styles/app.scss';

function App() {
  return (
    <div className="container">
      <img src={logoImg} alt="AirCnC" />

      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
