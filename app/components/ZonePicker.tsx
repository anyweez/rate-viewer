import React from 'react';

type Props = {

};

export default function ZonePicker(props : Props) {
    let zone_number = '';

    const update_zone_number = (field : string) => {
        zone_number = field;
    }

    return (
        <div>
            <h2>Zone number:</h2>
            <input type="number" 
                value={zone_number}
                onChange={ev => update_zone_number(ev.target.value)} />
        </div>
    )
}