const SPEED_STEP = 10;
const SPEED_RANGE = [70, 140];

const elUp$ = document.querySelector('[data-speed="up"]');
const elDown$ = document.querySelector('[data-speed="down"]');

/** Speed Control. */
export class SpeedEl {
    onClick(cb) {
        elUp$.addEventListener('click', (el$) => {
            cb(el$, SPEED_STEP, SPEED_RANGE);
        });

        elDown$.addEventListener('click', (el$) => {
            cb(el$, SPEED_STEP, SPEED_RANGE, true);
        });
    }
}
