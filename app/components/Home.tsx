import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import routes from '../constants/routes.json'; 
import styles from './Home.css';

const passport = require('node-passport-parking');

export default function Home() {
  const [accessToken, setAccessToken] = useState('');
  const [client, setClient] = useState({ 
    id: process.env.CLIENT_ID ? process.env.CLIENT_ID : '', 
    secret: process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : '', 
  });

  const checkAuth = () => {

    return passport('production').authenticate({
      client_id: client.id,
      client_secret: client.secret,
    }).then((env : any) => {
      console.log(env);
    });
    // TODO: get access token using credentials
    setAccessToken('abc123');
  };

  const updateClientId = (next : string) => {
    setClient({ id: next, secret: client.secret });
  }

  const updateClientSecret = (next : string) => {
    setClient({ id: client.id, secret: next });
  }

  if (accessToken.length > 0) {
    return <Redirect to={routes.PARKING} />;
  }

  return (
    <div className={styles.container} data-tid="container">
      <h2>Passport</h2>
      <h3>Rate tester</h3>

      <input type="text" 
        value={client.id} 
        placeholder="Client ID" 
        onChange={ev => updateClientId(ev.target.value)}></input>

      <input type="text" 
        value={client.secret} 
        placeholder="Client secret"
        onChange={ev => updateClientSecret(ev.target.value)}></input>

      <button type="button" onClick={checkAuth}>Authenticate</button>
    </div>
  );
}
