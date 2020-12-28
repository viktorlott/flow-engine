import axios from 'axios'
import Handlebars from 'handlebars'

Handlebars.registerHelper('stringify', function(source) {
    return new Handlebars.SafeString(JSON.stringify(source))
})

class Response {
    constructor(object) {
        Object.assign(this, object)
    }
}

// const sandbox = script =>  `
// (async function() {
//     async function main() {
//         let _settings = { 
//             prescript: {}
//             multiple: false, 
//             stop: false,
//             data: null,
//             script: null,
//         }

//         function runEach(arr) {
//             return arr
//         }

//         function RunOnEachElementIn(arr) {
//             _settings.data = arr
//             _settings.multiple = true
//         }
        
//         function StopIntegration() {
//             _settings.stop = true
//         }
        
//         function RunIntegration() {
//             _settings.stop = false
//         }
    
//         function SetGlobal(key, value) {
//             _settings.prescript[key] = value
//         }
    
//         async function run() {
//             ${script}
//         }
        
//         _settings.script = await run()
//             return _settings
//         }

//     return await main()
// })()`



function evaluate(eval_string, context) {
    const temp = `
        (async function() {
            ${Object.keys(context).length > 0
                ? `let ${Object.keys(context).map((key) => ` ${key} = context['${key}']`)};`
                : ``
              }
        
            let _settings = { 
                globals: {},
                multiple: false, 
                stop: false,
                data: null,
                script: null,
            }
    
            function runEach(arr) {
                return arr
            }
    
            function RunOnEachElementIn(arr) {
                _settings.data = arr
                _settings.multiple = true
            }
            
            function StopIntegration() {
                _settings.stop = true
            }
            
            function RunIntegration() {
                _settings.stop = false
            }
        
            function SetGlobal(key, value) {
                _settings.globals[key] = value
            }
        
            async function run() {
                ${eval_string}
            }
            
            _settings.script = await run()

            return _settings
        })()
 
    `

    return eval(temp)
}



class Integration {
    constructor(state, ctx={}) {
        this.state = state
        this.options = {}
        this.ctx = this._createContext(ctx)

        if(state) {
            try {
                this._assemble(state)
            } catch(err) {
                console.log(err)
            }
        }

    }


    async _assemble(state) {
        this._setPrescript(state.prescript)
        this._setUrl(state.url)
        this._setMethod(state.method)
        this._setHeaders(state.headers)


        this._setData(state)
    }


    _template(str) {
        try {
            return Handlebars.compile(str || "")(this.ctx)
        } catch(err) {
            console.log(err)
            return str
        }
    }

    _createContext(ctx) {
        return {globals: ctx}
    }

    async _setPrescript(script) {
        try {
            const result = await evaluate(script, this.ctx)

            this.options.prescript = result
            
        } catch(err) {
            console.log(err)
            this.options.prescript = { 
                globals: {},
                multiple: false, 
                stop: false,
                data: null,
                script: { error: JSON.stringify(err, null, 2) },
            }
        }
    }

    _setMethod(method) {
        this.options.method = method
    }

    _setUrl(url) {
        try {
            this.options.url = this._template(url)
        } catch(err) {
            console.log(err)
            this.options.url = url
        }
    }


    transformHeaders(headers) {
        const _headers = {}
        headers.rows.forEach(row => {
            if(row.key) {
                _headers[row.key] = row.value
            }
        })
        return _headers
    }

    _setHeaders(headers, transformed=false) {
   
        const _headers = transformed ? headers : this.transformHeaders(headers)

        if(!this.options.headers) {
            this.options.headers = {}
        }


        this.options.headers = {...this.options.headers, ..._headers }
    }



    _setBody(data) {
        this.options.data = data
    }

    setAgent(agent) {
        this.options.httpsAgent = agent
    }


    _setBasicAuth(auth) {
        this.options.auth = auth
    }

    _setResponseType(type) {
        try {
            this.options.responseType = this._template(type) || "json"
        } catch(err) {
            console.log(err)
            this.options.responseType = "json"
        }
    }



    _setData(state) {
        switch(state.type) {
            case "standard": {
                const data = this._template(state.body)

                this._setBody(data)
                break;
            }
            case "formdata": {
                this._setFormData(state.formdata.rows)
                break;
            }
            default: {
                
            }
        }
    }

    _setFormData(data=[]) {
        if(!data || (data && Array.isArray(data) && !data.length)) return
        const form = new FormData()
        
        const formdataArgs = data.map((row) => {
            return {
                type: row.type,
                args: [row.key].concat(row.type === "text" ? [row.value] : [row.file, row.value])
            }
        })

        this.options.formdata = formdataArgs

        formdataArgs.forEach(fd => {
            const [key, value, filename] = fd.args
            if(filename) {
                form.append(key, new Blob([value], { type: "text/plain"}), filename)
            } else {
                form.append(key, value)
            }
        })

        form.getHeaders && this._setHeaders(form.getHeaders())
        this._setData(form)

    }

    errorHandler(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            // console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message);
        }
        // console.log(error.config);


        return error
    }

    successHandler(response) {
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);

      
        return response
    }



    async execute() {
        
        return axios(this.options).then(this.successHandler).catch(this.errorHandler)
    }
}

export default Integration