class DnD {
    constructor() {
        this.data = {}
    }
    getData(key) {
        document.querySelector("#drop-data").remove()
        const data = this.data[key]
        delete this.data[key]
        return data
    }
    setData(key, value) {
        this.data[key] = value
    }
}

const dnd = new DnD()
const globals = {}


export default dnd


// bg #d3edff
// color #459fed