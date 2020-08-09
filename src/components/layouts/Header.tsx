import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: rgb(245, 195, 64);
    top: 0;
    left: 0;
    height: 100px;
`;

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            Hello?
        </HeaderContainer>
    );
};

export default Header;
