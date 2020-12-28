import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Container } from './styled'
import {Query, Builder, BasicConfig, Utils as QbUtils} from 'react-awesome-query-builder';

import Basic from 'react-awesome-query-builder/lib/config/basic';
import CustomConfig from './CustomConfig'

import 'react-awesome-query-builder/lib/css/styles.css';
import 'react-awesome-query-builder/lib/css/compact_styles.css';


const config = {
    ...BasicConfig,
    fields: {
        test: {
            label: 'Test',
            type: 'text',
            fieldSettings: {
                allowCustomValues: true
            },
            valueSources: ['value', 'field', 'func'],
            preferWidgets: ['number'],
            
        },
      qty: {
          label: 'Qty',
          type: 'number',
          fieldSettings: {
              min: 0,
              allowCustomValues: true
          },
          valueSources: ['value', 'field', 'func'],
          preferWidgets: ['number'],
          allowCustomValues: true
      },
      price: {
          label: 'Price',
          type: 'number',
          valueSources: ['value'],
          fieldSettings: {
              min: 10,
              max: 100,
          },
          preferWidgets: ['slider', 'rangeslider'],
      },
      color: {
          label: 'Color',
          type: 'select',
          valueSources: ['value'],
          fieldSettings: {
            listValues: [
              { value: 'yellow', title: 'Yellow' },
              { value: 'green', title: 'Green' },
              { value: 'orange', title: 'Orange' }
            ],
          }
      },
      user: {
        type: '!struct', // special keyword for comlex fields
        label: 'User',
        subfields: {
          // subfields of complex field
          name: {
            type: 'text',
            label: 'Name',
            label2: 'User name', //optional, see below
            fieldSettings: {
              validateValue: (val, _fieldSettings) => (val.length <= 20),
            }
          },
        },
      },
      is_promotion: {
          label: 'Promo?',
          type: 'boolean',
          operators: ['equal'],
          valueSources: ['value'],
      },
    }
  };


const renderBuilder = (props) => (
    <div className="query-builder-container" style={{padding: '10px'}}>
      <div className="query-builder qb-lite">
          <Builder {...props} />
      </div>
    </div>
  )
  const queryValue = {"id": QbUtils.uuid(), "type": "group"};

function QueryBuilder() {
    const [state, setState] = useState(() => ({ structure: [], 
        tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
        config: config
       }))

       const onChange = (immutableTree, config) => {
        // Tip: for better performance you can apply `throttle` - see `examples/demo`
        setState(prev => ({...prev ,tree: immutableTree, config: config}));
  
        const jsonTree = QbUtils.getTree(immutableTree);
        console.log(jsonTree);
        // `jsonTree` can be saved to backend, and later loaded to `queryValue`
      }


    return (
        <Container>
          <Query
            {...config} 
            value={state.tree}
            renderBuilder={renderBuilder}
            onChange={onChange}
        />

        </Container>
    )
}



export default QueryBuilder