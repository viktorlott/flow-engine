

export default function ShowAutocompletion(obj, monaco, lang="javascript") { 
    // Disable default autocompletion for javascript
    // monaco.languages.typescript.javascriptDefaults.setCompilerOptions({ noLib: true  });
  
    // Helper function to return the monaco completion item type of a thing
    function getType(thing, isMember) {
      isMember =  (isMember == undefined) ? (typeof isMember == "boolean") ? isMember : false : false; // Give isMember a default value of false
    
      switch ((typeof thing).toLowerCase()) { 
        case "object": 
          return monaco.languages.CompletionItemKind.Class;

        case "function": 
          return (isMember) ? monaco.languages.CompletionItemKind.Method : monaco.languages.CompletionItemKind.Function;

        default: 
          return (isMember) ? monaco.languages.CompletionItemKind.Property : monaco.languages.CompletionItemKind.Variable;
      }
    }
  
    // Register object that will return autocomplete items 
    monaco.languages.registerCompletionItemProvider(lang, {
      // Run this function when the period or open parenthesis is typed (and anything after a space)
      triggerCharacters: ['.', '(', "{{"],

      // Function to generate autocompletion results
      provideCompletionItems: function(model, position, token) {
        // Split everything the user has typed on the current line up at each space, and only look at the last word
        var last_chars = model.getValueInRange({startLineNumber: position.lineNumber, startColumn: 0, endLineNumber: position.lineNumber, endColumn: position.column});
        var words = last_chars.replace("\t", "").split(/[\s{}<>"'\\\/]+/gi); 

        var active_typing = words[words.length - 1]; // What the user is currently typing (everything after the last space)
  
        // If the last character typed is a period then we need to look at member objects of the obj object 
        var is_member = active_typing.charAt(active_typing.length - 1) == ".";

        // Array of autocompletion results
        var result = [];
            
        // Used for generic handling between member and non-member objects
        var last_token = obj; 
        var prefix = ''; 
      
        if (is_member) { 
          // Is a member, get a list of all members, and the prefix
          var parents = active_typing.substring(0, active_typing.length - 1).split("."); 
          last_token = obj[parents[0]]; 
          prefix = parents[0]; 

          // Loop through all the parents the current one will have (to generate prefix)
          for (var i = 1; i < parents.length; i++) { 
            if (last_token.hasOwnProperty(parents[i])) { 
              prefix += '.' + parents[i]; 
              last_token = last_token[parents[i]];
            } else { 
              // Not valid
              return result;
            }
          }
      
          prefix += '.';
        }
      
        // Get all the child properties of the last token
        for (var prop in last_token) { 
          // Do not show properites that begin with "__"
          if (last_token.hasOwnProperty(prop) && !prop.startsWith("__")) { 
            // Get the detail type (try-catch) incase object does not have prototype 
            var details = ''; 
            try { 
              details = last_token[prop].__proto__.constructor.name; 
            } catch (e) { 
              details = typeof last_token[prop]; 
            }
            
            // Create completion object
            var to_push = {
              label: prefix + prop,
              kind: getType(last_token[prop], is_member), 
              detail: details,     
              insertText: prop
            };

            // Change insertText and documentation for functions
            if (to_push.detail.toLowerCase() == 'function') { 
              to_push.insertText += "(";
              to_push.documentation = (last_token[prop].toString()).split("{")[0]; // Show function prototype in the documentation popup
            }

            // Add to final results
            result.push(to_push);
          }
        }
        // console.log(result)
        return {
            suggestions: result
        };
      }
  });
}

