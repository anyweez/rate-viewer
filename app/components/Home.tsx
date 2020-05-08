import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
// import { History } from 'history';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home() {
  const [access_token, set_token] = useState('');

  const check_auth = () => {
    console.log('Authenticating...');

    // TODO: get access token using credentials
    set_token('abc123');
  };

  if (access_token.length > 0) {
    console.log('access token found')
    return <Redirect to={routes.PARKING} />;
  }


  return (
    <div className={styles.container} data-tid="container">
      <h2>Passport</h2>
      <h3>Rate tester</h3>

      <button onClick={check_auth}>Authenticate</button>
    </div>
  );
}
