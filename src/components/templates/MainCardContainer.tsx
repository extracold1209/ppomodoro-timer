import React from 'react';
import Header from '../layouts/Header';
import {Container, Row} from 'react-grid-system';
import FlattenCard from '../atoms/FlattenCard';
import {useSelector} from 'react-redux';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../stores';

const timerReselector = createSelector(
    (state: RootState) => state.timer.timers,
    (timers) => timers,
);

const MainCardContainer: React.FC = () => {
    const timers = useSelector(timerReselector);

    return (
        <>
            <Header/>
            <Container fluid>
                {
                    timers.map((timer, index) => (
                        <Row
                            gutterWidth={5}
                            align={'center'}
                            style={{marginBottom: 10}}
                            key={`card-${index}`}
                        >
                            <FlattenCard
                                timer={timer}
                            />
                        </Row>
                    ))
                }
            </Container>
        </>
    );
};

export default MainCardContainer;
