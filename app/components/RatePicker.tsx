import React, { useState } from 'react';
import {
  Container,
  Form,
  Input,
  Button,
  Table,
  Message
} from 'semantic-ui-react';
import moment from 'moment';

import styles from './RatePicker.css';

type Props = {
  env: any;
  zone: any;
  // onSelect:       (zone : any) => void,
};

export default function RatePicker(props: Props) {
  const [displayTime, setDisplayTime] = useState('');
  const [rates, setRates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [humanTime, setHumanTime] = useState('');

  const getRates = () => {
    const asDate = moment(displayTime).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    setIsLoading(true);

    // Human-readable datetime; importantly, contains day of week
    setHumanTime(
      `${moment(displayTime).format('dddd, MMMM Do YYYY, h:mm:ss a')} UTC`
    );

    return props.env
      .get_rates({
        zone_id: props.zone.id,
        start_time: asDate,

        vehicle_plate: 'ABC123',
        vehicle_state: 'WA',
        vehicle_country: 'US'
      })
      .then((result: any) => {
        setRates(result.rates);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setRates([]);

        console.log('got error');
      });
  };

  const updateDisplayTime = (str: string) => {
    setDisplayTime(str);
  };

  const generateRow = (rate: any) => {
    return (
      <Table.Row key={rate.increment}>
        <Table.Cell>{rate.increment}</Table.Cell>
        <Table.Cell>${rate.total_fees.amount}</Table.Cell>
      </Table.Row>
    );
  };

  const generateTable = () => {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Minutes</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{rates.map(r => generateRow(r))}</Table.Body>
      </Table>
    );
  };

  const showMessage = () => {
    return (
      <Message>
        <Message.Header>No rates available</Message.Header>
        <p>You cannot pay for parking at this time.</p>
      </Message>
    );
  };

  return (
    <Container className={styles.container}>
      <Form>
        <Form.Field>
          <label>Session start time</label>
          <Input
            value={displayTime}
            onChange={ev => updateDisplayTime(ev.target.value)}
          />
        </Form.Field>

        <Button
          className={{ loading: isLoading, primary: true }}
          onClick={() => getRates()}
        >
          Get rates
        </Button>

        <span className={styles.human_time}>{humanTime}</span>
      </Form>

      {rates !== null && rates.length > 0 ? generateTable() : null}
      {rates !== null && rates.length === 0 ? showMessage() : null}
    </Container>
  );
}
