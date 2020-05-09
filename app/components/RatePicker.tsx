import React, { useState } from 'react';
import moment from 'moment';

type Props = {
    env:            any,
    zone:           any,
    // onSelect:       (zone : any) => void,
};

export default function RatePicker(props : Props) {
    const [displayTime, setDisplayTime] = useState('');
    const [rates, setRates] = useState(null);

    const getRates = () => {
        const asDate = moment(displayTime).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
 
        console.log({
            zone_id: props.zone.id,
            start_time: asDate,
        })
        return props.env.get_rates({
            zone_id: props.zone.id,
            start_time: asDate,

            vehicle_plate: 'ABC123',
            vehicle_state: 'WA',
            vehicle_country: 'US',
        }).then((result : any) => {
            setRates(result);
        });
    };

    const updateDisplayTime = (str : string) => {
        setDisplayTime(str);
    }

    return (
        <div>
            <h2>Rate picker</h2>
            <input type="datetime" 
                value={displayTime} 
                onChange={ev => updateDisplayTime(ev.target.value)} />
            
            <button onClick={() => getRates()}>Get rates</button>

            <ul>
                {
                    rates ? rates.rates.map(rate => {
                        return (
                            <li key={rate.increment}>Duration: {rate.increment} minutes; Cost: ${rate.total_fees.amount}</li>
                        )
                    }) : null
                }
            </ul>
        </div>
    );
}