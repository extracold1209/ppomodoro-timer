import React from 'react';
import {Flex} from 'rebass';
import styled from '@emotion/styled';
import {DefaultTheme} from '../../constants/theme';

const FooterFlexContainer = styled(Flex)`
    width: 100%;
    bottom: 0;
    position: fixed;
    height: 52px;
    background-color: ${({theme}: {theme: DefaultTheme}) => theme.colors.primary};
    padding: 1rem;
    margin-top: 1rem;
    justify-content: center;
    align-items: center;
`;

const Footer: React.FC = () => {
    return (
        <FooterFlexContainer>
            하는일이 없어요
        </FooterFlexContainer>
    );
};

export default Footer;
