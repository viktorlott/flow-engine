import { makeAutoObservable } from "mobx"
import example from './example.json'
import { CustomNodeFactory } from '../../Diagram/node/CustomNodeFactory';
import { CustomNodeModel } from '../../Diagram/node/CustomNodeModel';
import { CustomPortModel } from '../../Diagram/port/CustomPortModel';
import { CustomPortFactory } from '../../Diagram/port/CustomPortFactory'
import { CustomLabelFactory } from '../../Diagram/label/CustomLabelFactory'
import { CustomLinkFactory } from '../../Diagram/link/CustomLinkFactory'

import createEngine, {
    DefaultLinkModel,
    DefaultNodeModel,
    DefaultPortModel,
    DiagramModel,
    PathFindingLinkFactory,
    PortModelAlignment
} from '@projectstorm/react-diagrams';

import {
    CanvasWidget,
    DeleteItemsAction
} from '@projectstorm/react-canvas-core';






class Graph {
    engine = createEngine({ registerDefaultZoomCanvasAction: true })
    tabs = []
    current = 0

    constructor() {
        makeAutoObservable(this)

        this.engine.getLinkFactories().registerFactory(new CustomLinkFactory())
        this.engine.getLabelFactories().registerFactory(new CustomLabelFactory())
        this.engine.getPortFactories().registerFactory(new CustomPortFactory())
        this.engine.getNodeFactories().registerFactory(new CustomNodeFactory())

        const model = this.setupModel(true)

        this.tabs.push({
            model: model,
            name: "Standardgraf"
        })

        this.engine.setModel(model)

        this.addTab("Ny graf 1", false)
        this.addTab("Ny graf 2", false)
        this.addTab("Ny graf 3", false)
    }

    setupModel(defaultModel = false) {
        const model = new DiagramModel()
        defaultModel && model.deserializeModel(example, this.engine)
        model.setGridSize(15)
        return model
    }

    selectTab(index) {
        this.current = index
        this.engine.setModel(this.tabs[index].model)
    }

    addTab(name, setModel=true) {
        this.tabs.push({
            model: this.setupModel(false, false),
            name: name || "standardgraf"
        })
        if(setModel) {
            this.current = this.tabs.length - 1
            this.engine.setModel(this.tabs[this.current].model)
        }
        
    }

    removeTab(index) {
        this.tabs.splice(index, 1)
        this.current = index - 1 < 0 ? 0 : index - 1
        this.engine.setModel(this.tabs[this.current].model)
    }

    getCurrentModel() {
        return this.tabs[this.current].model
    }

}



export default new Graph()