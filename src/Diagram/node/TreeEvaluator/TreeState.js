
export default class TreeState {
    constructor() {

    }

    set(key, value) {
        this[key] = value
    }

    getData() {
        const json = {}
        for(let key in this) {
            json[key] = this[key].data
        }

        return json
    }
}
