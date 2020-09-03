import React from 'react';
import {Box, Flex, Link, Text} from 'rebass';
import styled from '@emotion/styled';
import {DefaultTheme} from '../../constants/theme';

const HeaderFlexContainer = styled(Flex)`
    background-color: ${({theme}: {theme: DefaultTheme}) => theme.colors.primary}; 
    align-items: center;
    margin-bottom: 1rem;
    height: 52px;
    padding: 0 10px;
`;

const Header: React.FC = () => {
    return (
        <HeaderFlexContainer>
            <Text p={2} fontWeight='bold'>찐붕이 앰생탈출 뽀모도로 타이머</Text>
            <Box mx='auto'/>
            <Link variant='nav'>
                [찐붕]
            </Link>
        </HeaderFlexContainer>
    );
};

export default Header;
