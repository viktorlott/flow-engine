
import TreeLinks from './TreeLinks'
import TreeNode from './TreeNode'
import TreeState from './TreeState'


export default class TreeEvaluator {
    constructor(node) {
        this.state = new TreeState()
        this.links = new TreeLinks()
        this.parent = new TreeNode(node, this.state, this.links)
    }

    evaluate() {
        return this.parent.trigger()
    }
}

