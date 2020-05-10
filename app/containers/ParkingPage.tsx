import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ZonePicker from '../components/ZonePicker';
import RatePicker from '../components/RatePicker';
import routes from '../constants/routes.json';

import styles from './ParkingPage.css';

export default function ParkingPage(props: any) {
  const { env } = props.location.state;

  const [zone, setZone] = useState(null);

  const selectZone = (zone: any) => {
    setZone(zone);
  };

  return (
    <Container className={styles.container}>
      <Link to={routes.HOME}>&lt; Change credentials</Link>

      <ZonePicker env={env} onSelect={selectZone} />

      {zone !== null ? <RatePicker env={env} zone={zone} /> : null}
    </Container>
  );
}
