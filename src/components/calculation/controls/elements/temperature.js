const TEMPERATURE_STEP = 10;
const TEMPERATURE_RANGE = [-10, 40];

const elUp$ = document.querySelector('[data-temperature="up"]');
const elDown$ = document.querySelector('[data-temperature="down"]');

/** Temperature Control. */
export class TemperatureEl {
    onClick(cb) {
        elUp$.addEventListener('click', (el$) => {
            cb(el$, TEMPERATURE_STEP, TEMPERATURE_RANGE);
        });

        elDown$.addEventListener('click', (el$) => {
            cb(el$, TEMPERATURE_STEP, TEMPERATURE_RANGE, true);
        });
    }
}
