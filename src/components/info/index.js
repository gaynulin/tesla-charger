import './info.scss';

const arrowBtn$ = document.getElementById('arrow');
const calculationBlock$ = document.querySelector('.calculation');

arrowBtn$.addEventListener('click', () => {
    calculationBlock$.scrollIntoView({ behavior: "smooth", block: "start" });
});
