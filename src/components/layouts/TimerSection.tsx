import React from 'react';
import {Box, Card, Flex} from 'rebass';

const TimerSection: React.FC = () => {
    return (
        <Card>
            <Box
                color={'grey'}
                fontSize={1}
            >
                1 / 15 번째 뽀모도로..
            </Box>
            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}
            >
                <Flex>
                    지금은 집중시간 !
                </Flex>
                <Flex>
                    32분 02초
                </Flex>
            </Flex>
        </Card>
    );
};

export default TimerSection;
