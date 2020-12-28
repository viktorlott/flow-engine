import { makeAutoObservable } from "mobx"
import standardnodes from './standardnodes'
import apinodes from './apinodes'

class Nodes {
    standard = standardnodes
    api = apinodes


    constructor() {
        makeAutoObservable(this)
    }

}





export default new Nodes()