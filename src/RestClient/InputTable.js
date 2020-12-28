import React, { useCallback, useState, useContext, useRef, useEffect } from 'react'
import get from 'lodash/get'
import styled, { createGlobalStyle }  from 'styled-components'

import DropList from './DropList'
const borderColor = "#ececec"


const Table = styled.table`
  border-collapse: collapse;
  width: calc(100% - 10px);
  margin-left: 10px;
  ${props => props.disabled ? "opacity: 0.5" : ""}
  & thead th {
    padding: 5px;
    font-size: 10px;
    text-align: left;
    text-transform: uppercase;
    padding-left: 22px;
    color: #9a9a9a;
    font-weight: 500;
  }
  & td, & tr {
    position: relative;
	padding: 5px 20px;;
	/* overflow: hidden; */
  }
  margin-bottom: 0!important;
`;

const ButtonM = styled.button`

	margin: 4px;
	font-size: 12px;
	background: transparent;
	border: none;
    height: 100%;
    width: 100%;
    max-width: 20px;
	font-weight: 700;
    outline: none;
    cursor: pointer;
    ${props => props.color ? "color:"+props.color+";" : ""}
    color:#232b40;
`
const InputM = styled.input`
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
    padding: 5px;
    color: #232b40!important;
    color: #929191!important;

    /* border-bottom: 1px solid #dadada; */
    background:#ffffff;
    font-weight: 400;
    
    width: 100%;
    font-size: 14px;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid var(--element-border-color);
  	/* border: 1px solid #dadada; */
    &::placeholder {
      color: #d8d8d8;
    }
`

const options = [
  { value: "text", label: "Text" },
  { value: "file", label: "Fil" },
]

const InputTable = (props) => {
  // const defaultData = get(props, ["default"], backup)
  const { watch, register, unregister, name, setValue, defaultValue } = props


    useEffect(() => {
        register({ name })
        return () => void unregister({ name })
    },[])

    const value = watch(name, defaultValue) 

  const addRow = useCallback(() => {


    setValue(name, {
        ...value,
        rows: [
          ...value.rows,
              {
                  type: "text",
                  key: "",
                  value: ""
              }
        ]
      }) 
	});

	const removeRow = useCallback(i => () => {		
        setValue(name, {
            ...value,
            rows: value.rows.filter((_, index) => index !== i)
		})
  })

  const onChange = useCallback((_name, index) => e => {

        setValue(name, {
				...value,
				rows: value.rows.map((row, i) => {
                    if (i === index && _name in row) {
                        return { ...row, [_name]: e.target.value };
                    }
                    return row;
				})
		}); 
	});

	const cols = get(props, ["value", "cols"], value.cols)
	const rows = get(props, ["value", "rows"], value.rows)



  return (
	<div className='row' style={{display: props.active ? "block" : "none", marginTop: 20}}>
			<Table >
				<thead>
          <tr>
            <th>Nyckel</th><th>Värde</th>

          </tr>
				</thead>
				<tbody>
				{rows.map((row, i) => {
					return (
					<tr key={i}>
						{cols.map((col, index) => {
						return (
							<td key={index + "_col"}>
								<InputM
									type="text"
                  placeholder={col.placeholder}
									data-name={col.name}
									onChange={onChange(col.name, i)}
									value={col.name ? row[col.name] : "empty"}/>
							</td>
						);
						})}		

						<td style={{ border: "none", width: "10px" }}>
							<ButtonM color="#ff4c4c" onClick={removeRow(i)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path  d="M17 22H7C5.89543 22 5 21.1046 5 20V7H3V5H7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H21V7H19V20C19 21.1046 18.1046 22 17 22ZM7 7V20H17V7H7ZM9 4V5H15V4H9ZM15 18H13V9H15V18ZM11 18H9V9H11V18Z" fill="#ff6161"></path>
                  </svg>  
              </ButtonM>
						</td>
					</tr>
					);
				})}
				</tbody>
				<tfoot>
					{/* <tr>
						<td style={{ border: "none" }}>
							<ButtonM onClick={addRow}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 20H17V17H14V15H17V12H19V15H22V17H19V20ZM12 17H2V15H12V17ZM15 13H2V11H15V13ZM15 9H2V7H15V9Z" fill="#a7a7a7"></path>
                  </svg>
              </ButtonM>
						</td>
					</tr>	 */}
          <tr style={{cursor: "pointer"}} onClick={addRow} >
						{/* <td style={{ border: "none" }}>
							<ButtonM onClick={addRow}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 20H17V17H14V15H17V12H19V15H22V17H19V20ZM12 17H2V15H12V17ZM15 13H2V11H15V13ZM15 9H2V7H15V9Z" fill="#a7a7a7"></path>
                  </svg>
              </ButtonM>
						</td> */}
            <td key={rows.length+"_col_" + 0} >
              <InputM
              key={rows.length+"_col_" + 0 + "input"}
              style={{opacity: 0.5}}
                type="text"
                placeholder="Lägg till nytt fält"
           
                />




              </td>
                <td key={rows.length+"_col_" + 1}>
                <InputM
                key={rows.length+"_col_" + 0 + "input"}

                style={{pointerEvents: "none", opacity: 0.3}}
                type="text"
          
                />
              </td>

              <td style={{ border: "none", width: "10px", opacity: 0 }} >
							<ButtonM color="#ff4c4c" >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path  d="M17 22H7C5.89543 22 5 21.1046 5 20V7H3V5H7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H21V7H19V20C19 21.1046 18.1046 22 17 22ZM7 7V20H17V7H7ZM9 4V5H15V4H9ZM15 18H13V9H15V18ZM11 18H9V9H11V18Z" fill="#ff6161"></path>
                  </svg>  
              </ButtonM>
						</td>
					</tr>	
				</tfoot>
			</Table>
	</div>

  );
}


export default InputTable