import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ZonePicker from '../components/ZonePicker';
import RatePicker from '../components/RatePicker';
import routes from '../constants/routes.json';


export default function ParkingPage(props: any) {
    const env = props.location.state.env;

    const [zone, setZone] = useState(null);

    const selectZone = (zone: any) => {
        setZone(zone);

        console.log('Selected zone:');
        console.log(zone);
    }

    return (
        <div>
            <h2>ParkingPage</h2>
            <Link to={routes.HOME}>The real home</Link>
            <ZonePicker env={env} onSelect={selectZone} />

            { zone !== null ? <RatePicker env={env} zone={zone} /> : null}
        </div>
    );
};