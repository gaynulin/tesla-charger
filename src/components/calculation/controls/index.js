import './controls.scss';


window.addEventListener('load', () => {
    // The component should be loaded after the metrics component is loaded, which loads the json data.
    import(/* webpackChunkName: "controls" */ './logic');
});
