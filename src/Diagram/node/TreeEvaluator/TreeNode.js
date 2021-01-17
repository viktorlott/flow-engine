import Integration from '../../../utils/IntegrationModel'


class Response {
    constructor(object) {
        Object.assign(this, object)
    }
}


export default class TreeNode {
    constructor(node, state = {}, links = {}) {
        this.node = node
        this.links = links
        this.state = state


    }

    wait(ms) {
        return new Promise(res => setTimeout(res, ms))
    }


    async trigger(node = this.node) {

        this.activateNode(node)
        await this.wait(1000)


        const result = await this.run(node)


        this.state.set((node.options && node.options.name) + "_" + Math.random().toString(36).substring(2), result)


        try {
            if (this.data.isAxiosError) {
                const port = node.getPort("error")
                await this.stepThrough(port)
            } else {
                const port = node.getPort("out")
                await this.stepThrough(port)
            }

        } catch (err) {
            console.log(err)
        }

        this.deactivateNode(node)

        return this.state
    }

    extractLinksFromInPort(node) {
        const inPort = node.getPort("in")
        return inPort.links
    }




    extractPortsFromNode(node) {
        return Object.entries(node.getPorts())
    }

    extractLinksFromPort(port) {
        if (!port) return false
        const { links } = port
        if (!links) return false

        return Object.entries(links)
    }

    extractLinkData(link) {
        const { targetPort, sourcePort } = link

        if (!targetPort) return { targetPort: false, sourcePort }

        const { parent: child } = targetPort

        const prevColors = this.getColors(link, targetPort)
        const sourceColor = this.getSourcePortColor(sourcePort)

        return {
            nodePort: child,
            targetPort,
            sourcePort,
            prevColors,
            sourceColor
        }
    }

    getSourcePortColor(sourcePort) {
        return sourcePort.options.color
    }

    getColors(link, targetPort) {
        return {
            targetPort: targetPort.options.color,
            link: link.options.selectedColor
        }
    }

    applyColor(link, targetPort, color) {
        link.options.selectedColor = color
        targetPort.options.color = color
    }

    revertColor(link, targetPort, colors) {
        link.options.selectedColor = colors.link
        targetPort.options.color = colors.targetPort
    }

    activateLink(link) {
        link.widget.setActive(true)
    }

    deactivateLink(link) {
        link.widget.setActive(false)
    }

    activateNode(node) {
        node.widget.setActive(true)
    }

    deactivateNode(node) {
        node.widget.setActive(false)
    }

    async stepThrough(port) {
        const links = this.extractLinksFromPort(port)
        if (!links) return Promise.resolve()

        for (let [key, link] of links) {
            const { targetPort, nodePort, prevColors, sourceColor } = this.extractLinkData(link)

            if (!targetPort) {
                continue
            }

            this.applyColor(link, targetPort, sourceColor)
            this.activateLink(link)

            const state = await this.next(nodePort, key)



            this.revertColor(link, targetPort, prevColors)
            this.deactivateLink(link)
        }
    }



    async next(node, key) {
        const flowNode = new TreeNode(node, this.state, this.links)

        this.links.activate(this.node, node)

        if (this.links.checkActive(node, "in") === false) {
            // return Promise.resolve()
        }


        // this.state.set(key, flowNode)


        return await flowNode.trigger()

    }

    async run(node) {
        const ctx = this.state.getData()

        try {
            const integration = new Integration(node.options.data || iData, ctx)
            const result = await integration.execute()

            const resp = new Response(result)
            // console.info(node.name,   { type: "response", payload: resp })
            // "#35496f" ||node.options.color || 
            console.info("%c"+node.options.name, `border-left: 2px solid ${node.options.color};color: ${ "#c4c4c4"}; font-weight: 500; font-size: 13px; padding: 4px 8px; background: #f3f3f3; border-radius: 0 6px 6px 0; font-family: 'Exo 2','Oxygen',sans-serif!important; text-transform: uppercase;`)
            console.info({ type: "response", payload: resp })
            console.info()
            

            this.data = result
            return result
        } catch (err) {
            console.log("woow", err)
            return Promise.resolve(err)
        }
    }

}



const iData = {
    requestTab: "body", responseTab: "result", url: "", method: "get", body: "", responseRaw: "", headers: {
        cols: [{ name: "key", default: "", placeholder: "Nyckel" }, { name: "value", default: "", placeholder: "Värde" }],
        rows: [
            {
                key: "content-type",
                value: "plain/text"
            }
        ]
    }, type: "standard", response: "", logs: "", name: "hello"
}