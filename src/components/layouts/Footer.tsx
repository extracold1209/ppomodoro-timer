import React, {useCallback} from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import {useDispatch} from 'react-redux';

const FooterContainer = styled.div`
    display: flex;
    //position: fixed;
    //width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    padding: 1rem;
    background-color: rgb(245, 195, 64);
    bottom: 0;
    left: 0;
    height: 4vh;
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            하는일이 없어요
        </FooterContainer>
    );
};

export default Footer;
