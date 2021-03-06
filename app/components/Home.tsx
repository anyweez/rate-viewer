import React, { useState } from 'react';
import { Input, Button, Header, Container, Form, Message, Radio } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

import PassportLogo from '../images/Passport-Lockup-1.png';

const passport = require('passport-parking');

export default function Home() {
  const [client, setClient] = useState({
    id: process.env.CLIENT_ID ? process.env.CLIENT_ID : '',
    secret: process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : ''
  });

  const [envName, setEnvName] = useState('production');
  const [env, setEnv] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState('');

  /**
   * Fetch the access token using the provided client ID and secret.
   */
  const checkAuth = () => {
    setIsLoading(true);

    return passport(envName)
      .authenticate({
        client_id: client.id,
        client_secret: client.secret
      })
      .then((newEnv: any) => {
        setEnv(newEnv);
        setIsLoading(false);

        return newEnv;
      })
      .catch(err => {
        setIsLoading(false);

        if (err.hasOwnProperty('title')) {
          setErrorDisplay(err.title)
        } else {
          setErrorDisplay('Unknown error');
        }
      });
  };

  /* Update client ID as the user types. */
  const updateClientId = (next: string) => {
    setClient({ id: next, secret: client.secret });
  };

  /* Update client secret as the user types. */
  const updateClientSecret = (next: string) => {
    setClient({ id: client.id, secret: next });
  };

  const showError = () => {
    return (
      <Message negative>
        <Message.Header>Invalid credentials</Message.Header>
        <p>{errorDisplay}</p>
      </Message>
    );
  }

  /* If we've got an authenticated environment, redirect to the parking page. */
  if (env !== null && env.is_authenticated()) {
    return (
      <Redirect
        to={{
          pathname: routes.PARKING,
          state: { env }
        }}
      />
    );
  }

  /* If we don't have an authenticated environment, allow the users to provide inputs. */
  return (
    <Container className={styles.container}>
      <img className={styles.header_logo} src={PassportLogo} alt="Passport logo" />
      <Header as="h2">Rate viewer</Header>

      { errorDisplay.length ? showError() : '' }

      <Form>
        <Form.Field>
          <label>Client ID</label>
          <Input
            value={client.id}
            onChange={ev => updateClientId(ev.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Client secret</label>
          <Input
            value={client.secret}
            type="password"
            onChange={ev => updateClientSecret(ev.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <Radio
            label='Sandbox' 
            name='environment'
            value='staging'
            checked={envName === 'staging'}
            onChange={(e, { value }) => setEnvName(value)} />
        </Form.Field>

        <Form.Field>
          <Radio
            label='Production'
            name='environment'
            value='production'
            checked={envName === 'production'}
            onChange={(e, { value }) => setEnvName(value)} />
        </Form.Field>

        <Button
          className={['primary', isLoading ? 'loading' : ''].join(' ')}
          onClick={checkAuth}
        >
          Authenticate
        </Button>
      </Form>
    </Container>
  );
}
