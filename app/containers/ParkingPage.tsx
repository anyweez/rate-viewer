import React from 'react';
import ZonePicker from '../components/ZonePicker';

type Props = {

}

export default function ParkingPage(props: Props) {
    console.log('parking page loaded');

    return (
        <div>
            <h2>ParkingPage</h2>
            <ZonePicker />
        </div>
    );
};