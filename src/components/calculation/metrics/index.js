import { Metric1Api, Metric2Api } from 'appservice/metric-api';

import './metrics.scss';

const metric1 = new Metric1Api();
const metric2 = new Metric2Api();

export function applyResult({ temperature, speed, air, wheelsize }) {
    const meter1$ = document.getElementById('meter1').querySelector('output');
    const meter2$ = document.getElementById('meter2').querySelector('output');

    meter1$.innerText = metric1.getResult(air, temperature, wheelsize, speed);
    meter2$.innerText = metric2.getResult(air, temperature, wheelsize, speed);
}
