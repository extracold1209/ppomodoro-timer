import React, {useCallback, useEffect, useState} from 'react';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';
import Header from '../layouts/Header';
import {Container, Row} from 'react-grid-system';
import FlattenCard from '../atoms/FlattenCard';
import {useDispatch, useSelector} from 'react-redux';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../stores';
import {removeTimer} from '../../stores/timer';
import Fade from '../animations/Fade';

const timerReselector = createSelector(
    (state: RootState) => state.timer.timers,
    (timers) => timers,
);

const MainCardContainer: React.FC = () => {
    const timers = useSelector(timerReselector);
    const [noneFadedTimers, setTimerFaded] = useState(timers.map(() => true));
    const dispatch = useDispatch();

    useEffect(() => {
        setTimerFaded(timers.map(() => true));
    }, [timers.length]);

    const onCardFadeEnd = useCallback((index: number) => {
        dispatch(removeTimer(index));
    }, []);

    const onCardDelete = useCallback((targetIndex: number) => {
        setTimerFaded(noneFadedTimers.map((_, timerIndex) => timerIndex !== targetIndex));
    }, []);

    return (
        <>
            <Header/>
            <DndProvider backend={HTML5Backend}>
                <Container fluid>
                    {
                        timers.map((timer, index) => (
                            <Fade enter={noneFadedTimers[index]}
                                  onFaded={() => onCardFadeEnd(index)}
                                  key={`card-${index}`}
                            >
                                <Row
                                    gutterWidth={5}
                                    align={'center'}
                                    style={{marginBottom: 10}}
                                >
                                    <FlattenCard
                                        index={index}
                                        timer={timer}
                                        onDelete={() => onCardDelete(index)}
                                    />
                                </Row>
                            </Fade>
                        ))
                    }
                </Container>
            </DndProvider>
        </>
    );
};

export default MainCardContainer;
