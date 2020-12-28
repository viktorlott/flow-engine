export default class TreeLinks {
    constructor() {
        this.links = {}
    }

    activate(sourceNode, targetNode) {
        if (!this.links[targetNode.options.id]) {
            this.links[targetNode.options.id] = {
                [sourceNode.options.id]: true
            }
        } else {
            this.links[targetNode.options.id][sourceNode.options.id] = true
        }
    }

    checkActive(node, portName) {
        const port = node.getPort(portName)

        for (let key in port.links) {
            const { sourcePort } = port.links[key]
            const { parent: linkParentNode } = sourcePort

            const linkParentNodeId = linkParentNode.options.id

            if (!this.links[node.options.id][linkParentNodeId]) {
                return false
            }
        }

        return true
    }




}
