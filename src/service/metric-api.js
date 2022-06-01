class Api {
    constructor() {
        // TODO: Lazy loading of the json files, so far. 
        // To optimise: should be fetched from server (considering a BFF concept), 
        // or could be put to a web worker to read it in a separete thread.
        // Reading from the server is the best option.

        import(/* webpackPrefetch: true *//* webpackChunkName: "metric1" */ 'appdata/metric-100D.json')
            .then(module => {
                module.default.forEach(item => {
                    this._metric1Map.set(this.#getKey(item), this.#createSpeedToKmMap(item));
                });
            });

        import(/* webpackPrefetch: true *//* webpackChunkName: "metric2" */ 'appdata/metric-P100D.json')
            .then(module => {
                module.default.forEach(item => {
                    this._metric2Map.set(this.#getKey(item), this.#createSpeedToKmMap(item));
                });
            });
    }

    /** Protected method which keeps the map for the 1st metric. */
    _metric1Map = new Map();
    /** Protected method which keeps the map for the 2nd metric. */
    _metric2Map = new Map();

    /**
     * Returns the metric result by input values
     * 
     * @param {*} ac 
     * @param {*} temp 
     * @param {*} wheelsize 
     * @param {*} speed 
     * @returns 
     */
    getResult(ac, temp, wheelsize, speed) {
        const hashKey = this.#getKey({ ac, temp, wheelsize });
        const mapObj = this._getMap().get(hashKey);
        if (mapObj === undefined) {
            // throw new Error(`No such data for key=${hashKey}!`);
            console.info(`The data for key=${hashKey} has not been loaded`);
            return "...";
        }
        const result = mapObj.get(speed);
        if (result === undefined) {
            // throw new Error(`No such data for key=${hashKey} and speed=${speed}!`);
            console.info(`The data for key=${hashKey} and speed=${speed} has not been loaded`);
            return "...";
        }

        return result;
    }

    /** Protected method to be implemented in the extended class. */
    _getMap() {
        throw new Error('getMap method should be implemented in the extended class!');
    }

    #getKey = ({ ac, temp, wheelsize }) => `${ac}_${temp}_${wheelsize}`;
    #createSpeedToKmMap = (item) => new Map(item.hwy.map(obj => [obj.kmh, obj.kilometers]));
}

/** The 1st metric calculation class. */
export class Metric1Api extends Api {
    _getMap = () => this._metric1Map;
}

/** The 2nd metric calculation class. */
export class Metric2Api extends Api {
    _getMap = () => this._metric2Map;
}
