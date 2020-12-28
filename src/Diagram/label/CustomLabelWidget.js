import * as React from 'react';

import { CustomLabelModel } from './CustomLabelModel';
import styled from 'styled-components';


export const Label = styled.div`
    user-select: none;
    pointer-events: auto;
    padding: 3px 7px;
    border-radius: 4px;
    color: white;
    background: #212121;
`;


// now we can render all what we want in the label
export const CustomLabelWidget = (props) => {


	return (
		<Label>
            {props.model.value}
		</Label>
	);
};