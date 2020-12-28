import { makeAutoObservable } from "mobx"

class Auth {

    constructor() {
        makeAutoObservable(this)
    }

}





export default new Auth()