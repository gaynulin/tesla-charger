const HEAT_THREASHOLD = 10;

const el$ = document.getElementById('air-cond');

/** Air Conditioner Button. */
export class AirCondEl {
    onClick(cb) {
        el$.addEventListener('click', cb);
    }

    applyStyles({ air, temperature }) {
        let title = '';

        if (temperature > HEAT_THREASHOLD) {
            title = 'AC';
            el$.setAttribute('data-state', 'fan');
        } else {
            title = 'HEAT';
            el$.setAttribute('data-state', 'heat');
        }

        if (air === "off") {
            el$.querySelector('span').innerText = title + " OFF";
            el$.setAttribute('data-pressed', false);
        } else {
            el$.querySelector('span').innerText = title + " ON";
            el$.setAttribute('data-pressed', true);
        }
    }
}
