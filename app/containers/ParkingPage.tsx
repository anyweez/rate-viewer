import React from 'react';
import { Link } from 'react-router-dom';
import ZonePicker from '../components/ZonePicker';
import routes from '../constants/routes.json';

type Props = {

}

export default function ParkingPage(props: Props) {
    console.log('parking page loaded');

    return (
        <div>
            <h2>ParkingPage</h2>
            <Link to={routes.HOME}>The real home</Link>
            <ZonePicker />
        </div>
    );
};