import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';

const FooterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    padding: 1rem;
    background-color: rgb(245, 195, 64);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
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
