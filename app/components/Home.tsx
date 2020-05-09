import React, { useState } from 'react';
import { Input, Button, Header, Container, Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import routes from '../constants/routes.json'; 
import styles from './Home.css';

import PassportLogo from '../images/Passport-Lockup-1.png';

const passport = require('node-passport-parking');

export default function Home() {
  const [client, setClient] = useState({ 
    id: process.env.CLIENT_ID ? process.env.CLIENT_ID : '', 
    secret: process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : '', 
  });

  const [env, setEnv] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetch the access token using the provided client ID and secret.
   */
  const checkAuth = () => {
    setIsLoading(true);

    return passport('production').authenticate({
      client_id: client.id,
      client_secret: client.secret,
    }).then((env : any) => {
      console.log('got response');
      console.log(env);

      setEnv(env);
      setIsLoading(false);
    });
  };

  const updateClientId = (next : string) => {
    setClient({ id: next, secret: client.secret });
  }

  const updateClientSecret = (next : string) => {
    setClient({ id: client.id, secret: next });
  }

  if (env !== null && env.is_authenticated()) {
    return <Redirect to={{
      pathname: routes.PARKING,
      state: { env },
    }} />;
  }
 
  return (
    <Container className={styles.container}>
      <img className={styles.header_logo} src={PassportLogo} />
      <Header as="h2">Zone &amp; rate tester</Header>

      <Form>
        <Form.Field
          value={client.id}
          onChange={ev => updateClientId(ev.target.value)}>
        
          <label>Client ID</label>
          <Input
            value={client.id}
            onChange={ev => updateClientId(ev.target.value)} />
        </Form.Field>

        <Form.Field
          value={client.secret}
          onChange={ev => updateClientId(ev.target.value)}>
        
          <label>Client secret</label>
          <Input
          value={client.secret} 
          onChange={ev => updateClientSecret(ev.target.value)} />
        </Form.Field>

        <Button
          className={{ loading: isLoading, primary: true }}
          onClick={checkAuth}>Authenticate</Button>
      </Form>
    </Container>
  );
}