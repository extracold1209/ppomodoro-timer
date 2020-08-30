import React from 'react';
import {Button, Flex} from 'rebass';

const TimerControlSection: React.FC = () => {
    return (
        <Flex
            justifyContent='center'
        >
            <Button variant='primary'>시작</Button>
        </Flex>
    );
};

export default TimerControlSection;
