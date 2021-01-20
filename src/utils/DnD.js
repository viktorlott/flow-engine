class DnD {
    constructor() {
        this.data = {}
    }
    removeDragImg() {
        const el = document.querySelector("#drop-data")

        if(el && el.remove) {
            el.remove()
        }
    }

    getData(key) {
        this.removeDragImg()
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