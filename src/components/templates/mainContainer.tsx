import React from 'react';
import styled from 'styled-components';
import {useDispatch} from "react-redux";
import {sayHelloAction} from '../../stores/common';

const CenterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;


const MainContainer: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <CenterContainer>
            <div>Hello MainContainer</div>
            <button onClick={() => dispatch(sayHelloAction)}>클릭</button>
        </CenterContainer>
    )
}

export default MainContainer;
