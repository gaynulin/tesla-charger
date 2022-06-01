import { applyResult } from 'appcomponents/calculation/metrics'

import { AirCondEl } from './aircond';
import { WheelEl } from './wheel';
import { TemperatureEl } from './temperature';
import { SpeedEl } from './speed';


const form$ = document.forms['controls'];


export class FormEl {
    constructor() {
        form$['air'].value = "off";
        form$['wheelsize'].value = 19;
        form$['speed'].value = 100;
        form$['temperature'].value = 20;

        this.#preventDefault();

        this.#airCondEl = new AirCondEl();
        this.#airCondEl.onClick(this.#toggleAirCond);

        this.#wheelEl = new WheelEl();
        this.#wheelEl.onClick(this.#changeWheelRadius);

        this.#temperatureEl = new TemperatureEl();
        this.#temperatureEl.onClick(this.#changeTemperature);

        this.#speedEl = new SpeedEl();
        this.#speedEl.onClick(this.#changeSpeed);
    }

    #airCondEl;
    #wheelEl;
    #temperatureEl;
    #speedEl;

    setUpInit() {
        const data = this.#getInputControls();
        this.#airCondEl.applyStyles(data);
        this.#wheelEl.applyStyles(data);
        applyResult(data);
    }

    #preventDefault() {
        form$.addEventListener('click', el$ => {
            el$.preventDefault();
        });
    }

    #getInputControls() {
        const formData = new FormData(form$);
        const formProps = Object.fromEntries(formData);
        const { temperature, speed, air, wheelsize } = formProps;

        return { temperature: +temperature, speed: +speed, air, wheelsize: +wheelsize };
    }

    #updateValue(key, val) {
        form$[key].value = val;
        return this.#getInputControls();
    }

    #toggleAirCond = () => {
        const { air } = this.#getInputControls();
        const data = this.#updateValue('air', air === "off" ? "on" : "off");
        this.#airCondEl.applyStyles(data);
        applyResult(data);
    }

    #changeWheelRadius = (wheelsize) => {
        const data = this.#updateValue('wheelsize', wheelsize);
        this.#wheelEl.applyStyles(data);
        applyResult(data);
    }

    #changeTemperature = (el$, step, range, isDown = false) => {
        const { temperature } = this.#getInputControls();
        if (isDown) {
            step = -1 * step;
        }
        const data = this.#updateValue('temperature', fixRange(el$, temperature + step, range));
        this.#airCondEl.applyStyles(data);
        applyResult(data);
    }

    #changeSpeed = (el$, step, range, isDown = false) => {
        const { speed } = this.#getInputControls();
        if (isDown) {
            step = -1 * step;
        }
        const data = this.#updateValue('speed', fixRange(el$, speed + step, range));
        applyResult(data);
    }
}


function fixRange(el$, val, range) {
    el$ = el$.target.closest('button');
    el$.parentNode.querySelectorAll(".control__svg-disabled")
        .forEach(e$ => e$.classList.remove('control__svg-disabled'));

    if (val <= range[0]) {
        addDisabledControlStyle(el$);
        return range[0];
    } else if (val >= range[1]) {
        addDisabledControlStyle(el$);
        return range[1];
    }
    return val;
}

function addDisabledControlStyle(el$) {
    const elem$ = el$.querySelector("img");
    if (elem$) {
        elem$.classList.add('control__svg-disabled');
    }
}
