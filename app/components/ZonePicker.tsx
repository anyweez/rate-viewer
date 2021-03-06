import React, { useState, useEffect } from 'react';
import { Container, Form, Input, Button, Table, Message } from 'semantic-ui-react';

import styles from './ZonePicker.css';

type Props = {
  env: any;
  onSelect: (zone: any) => void;
};

export default function ZonePicker(props: Props) {
  const [latitude, setLatitude] = useState('30.267958');
  const [longitude, setLongitude] = useState('-97.752228');
  const [zoneNumber, setZoneNumber] = useState(''); // Value of <input> box

  const [zones, setZones] = useState([]); // Search results
  const [searchComplete, setSearchComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const getZones = () => {
    setIsLoading(true);
    const zn = zoneNumber;
    const lat = parseFloat(latitude);
    const long = parseFloat(longitude);

    // const start_time = new Date();

    return props.env
      .search_zones({
        zone_number: zn,
        latitude: lat,
        longitude: long
      })
      .then((zones: []) => {
        // setRequestLatency(new Date().getTime() - start_time.getTime());
        setZones(zones);
        setSearchComplete(true);

        // setSearched(zn);
        setIsLoading(false);
      });
  };

  const generateRow = (zone: any) => {
    const zoneSelect = (zone: any) => {
      setZones([]);
      setDisabled(true);
      setZoneNumber(zone.number);

      props.onSelect(zone);
    };

    return (
      <Table.Row key={zone.id}>
        <Table.Cell>
          <Button
            className={ ['secondary'].join(' ') }
            onClick={() => zoneSelect(zone)}>
            Select
          </Button>
        </Table.Cell>
        <Table.Cell>{zone.number}</Table.Cell>
        <Table.Cell>{zone.name}</Table.Cell>
        <Table.Cell>{zone.operator.name}</Table.Cell>
      </Table.Row>
    );
  };

  const generateTable = () => {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Zone number</Table.HeaderCell>
            <Table.HeaderCell>Zone name</Table.HeaderCell>
            <Table.HeaderCell>Operator name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{zones.map(z => generateRow(z))}</Table.Body>
      </Table>
    );
  };

  return (
    <Container className={styles.container}>
      <Form>
        <Form.Field>
          <label>Zone number</label>
          <Input
            value={zoneNumber}
            labelPosition='right'
            className={[isDisabled ? 'disabled' : ''].join(' ')}
            onChange={ev => setZoneNumber(ev.target.value)} />
        </Form.Field>

        {/* Location input fields */}
        <div style={ { display: 'flex', flexDirection: 'row' }}>
          <Form.Field style={ { marginRight: 5 }}>
            <label>Latitude</label>
            <Input
              value={latitude}
              className={[isDisabled ? 'disabled' : ''].join(' ')}
              onChange={ev => setLatitude(ev.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Longitude</label>
            <Input
              value={longitude}
              className={[isDisabled ? 'disabled' : ''].join(' ')}
              onChange={ev => setLongitude(ev.target.value)}
            />
          </Form.Field>
        </div>

        { zones.length === 0 && searchComplete && !isDisabled ? 
            <Message
              icon='globe'
              header='No zones found.'
              content='There are no accessible zones matching the parameters you provided.'
            /> : ''
        }
        
        <Button
          className={['primary', isLoading ? 'loading' : '', isDisabled ? styles.hidden : ''].join(' ')}
          onClick={() => getZones()}
        >
          Find
        </Button>
      </Form>

      {zones.length > 0 ? generateTable() : null}
    </Container>
  );
}
