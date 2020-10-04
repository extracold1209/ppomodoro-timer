import React from 'react';
import styled from '@emotion/styled';
import {DefaultTheme} from '../../constants/theme';

type IProps = { radius?: number };

const CardContainer = styled.div<IProps & { theme: DefaultTheme }>`
    border: 1px solid black;
    border-radius: ${({radius}) => radius || 4}px;
    padding: ${({theme}) => theme.space[2]}px;
    box-shadow: 5px 7px 15px 0px rgba(189,189,189,1);
`;

const Card: React.FC<IProps> = (props) => (
    <CardContainer {...props}>
        {props.children}
    </CardContainer>
);

export default Card;
