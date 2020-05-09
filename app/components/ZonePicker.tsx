import React, { useState } from 'react';
import { Container, Form , Input, Button, Table } from 'semantic-ui-react';

import styles from './ZonePicker.css';

type Props = {
    env:            any,
    onSelect:       (zone : any) => void,
};

export default function ZonePicker(props : Props) {
    const [zoneNumber, setZoneNumber] = useState('');   // Value of <input> box
    const [zones, setZones] = useState([]);             // Search results
    // const [searched, setSearched] = useState('');       // Zone number of most recently searched zone
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setDisabled] = useState(false);

    const update_zone_number = (field : string) => {
        setZoneNumber(field);
    }

    const getZones = () => {
        setIsLoading(true);
        const zn = zoneNumber;

        return props.env.search_zones({
            zone_number: zn,
            latitude: 30.267958,            // todo: needs to be a variable
            longitude: -97.752228,          // todo: needs to be a variable
        }).then((zones : []) => {
            setZones(zones);

            // setSearched(zn);
            setIsLoading(false);
        });
    }

    const generateRow = (zone : any) => {
        const zoneSelect = (zone : any) => {
            setZones([]);
            setDisabled(true);

            props.onSelect(zone);
        };

        return (
            <Table.Row key={zone.id}>
                <Table.Cell>
                    <Button 
                        className={{ secondary: true }}
                        onClick={() => zoneSelect(zone)}>Select</Button>
                </Table.Cell>
                <Table.Cell>{zone.name}</Table.Cell>
                <Table.Cell>{zone.operator.name}</Table.Cell>
            </Table.Row>
        )
    }

    const generateTable = () => {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Zone name</Table.HeaderCell>
                        <Table.HeaderCell>Operator name</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    { zones.map(z => generateRow(z)) }
                </Table.Body>
            </Table>
        );
    }

    return (
        <Container className={styles.container}>
            <Form>
                <Form.Field>
                    <label>Zone number</label>

                    <Input
                        value={zoneNumber}
                        className={[ isDisabled ? 'disabled' : ''].join(' ') }
                        onChange={ev => update_zone_number(ev.target.value)} />
                </Form.Field>

                <Button 
                    className={{ loading: isLoading, primary: true, [styles.hidden]: isDisabled }}
                    onClick={() => getZones()}>Find</Button>
            </Form>

            { zones.length > 0 ? generateTable() : null }
        </Container>
    )
}