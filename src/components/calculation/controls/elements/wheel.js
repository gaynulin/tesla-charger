const els$ = document.querySelectorAll('button[data-wheel]');

/** Wheels Radius Control. */
export class WheelEl {
    onClick(cb) {
        els$.forEach(btn$ => {
            btn$.addEventListener('click', (el$) => {
                cb(el$.target.closest("button").getAttribute('data-wheel'));
            });
        });
    }

    applyStyles({wheelsize}) {
        document
            .querySelector(`button[data-wheel="${wheelsize}"]`)
            .classList
            .add('control__wheel-button_selected');

        document
            .querySelector(`button[data-wheel]:not([data-wheel="${wheelsize}"])`)
            .classList
            .remove('control__wheel-button_selected');
    }
}
