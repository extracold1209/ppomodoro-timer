import React from 'react';
import {Box, Flex, Link, Text} from 'rebass';
import styled from '@emotion/styled';

const HeaderFlexContainer = styled(Flex)`
    background-color: rgb(245, 195, 64);
    align-items: center;
    margin-bottom: 1rem;
    height: 10vh;
    padding: 0 10px;
`;

const Header: React.FC = () => {
    return (
        <HeaderFlexContainer>
            <Text p={2} fontWeight='bold'>찐붕게이의 인생리셋 타이머</Text>
            <Box mx='auto'/>
            <Link variant='nav'>
                [찐붕]
            </Link>
        </HeaderFlexContainer>
    );
};

export default Header;
