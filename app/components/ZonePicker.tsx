import React, { useState } from 'react';

type Props = {
    env:            any,
    onSelect:       (zone : any) => void,
};

export default function ZonePicker(props : Props) {
    const [zoneNumber, setZoneNumber] = useState('');   // Value of <input> box
    const [zones, setZones] = useState([]);             // Search results
    const [searched, setSearched] = useState('');       // Zone number of most recently searched zone

    const update_zone_number = (field : string) => {
        setZoneNumber(field);
    }

    const getZones = () => {
        const zn = zoneNumber;

        return props.env.search_zones({
            zone_number: zn,
            latitude: 30.267958,            // todo: needs to be a variable
            longitude: -97.752228,          // todo: needs to be a variable
        }).then((zones : []) => {
            setZones(zones);
            setSearched(zn);
        });
    }

    return (
        <div>
            <h2>Zone number:</h2>
            <input type="number" 
                value={zoneNumber}
                onChange={ev => update_zone_number(ev.target.value)} />

            <button onClick={() => getZones()}>Find</button>

            <ul>
                {
                zones.map(z => {
                    return (
                        <li key={z.id} onClick={() => props.onSelect(z)}>Zone {z.number} ({z.name})</li>
                    );
                })
                }
            </ul>
        </div>
    )
}