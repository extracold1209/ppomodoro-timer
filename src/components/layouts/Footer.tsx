import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';


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
            <Button>시작</Button>
            <Button>정지</Button>
        </FooterContainer>
    );
};

export default Footer;
