import React, {useCallback} from 'react';
import {floor} from 'lodash';
import TimerCard from '../atoms/TimerCard';
import {Col, Container, Row} from 'react-grid-system';
import AddTimerCard from '../atoms/AddTimerCard';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../stores';
import {addTimer} from '../../stores/timer';

const CardWrapper: React.FC = ({children, ...props}) => (
    <Col xs={12} md={6} lg={4} xl={3} {...props}>
        <div style={{padding: 5}}>
            {children}
        </div>
    </Col>
);

const MainContainer: React.FC = () => {
    const timers = useSelector<RootState, Timer[]>((state) => state.timer.timers);
    const dispatch = useDispatch();

    const handleAddTimerClicked = useCallback(() => {
        const addTimerAction = addTimer({
            initialSecond: floor(Math.random() * 100 % 60),
            title: `더미따리${floor(Math.random() * 10)}`
        });
        dispatch(addTimerAction);
    }, [timers]);

    return (
        <>
            <Header/>
            <Container>
                <Row>
                    {
                        timers.map(({initialSecond, title}, index) => (
                            <CardWrapper key={`card-${index}`}>
                                <TimerCard
                                    initialTime={initialSecond}
                                    title={title}
                                />
                            </CardWrapper>
                        ))
                    }
                    <CardWrapper>
                        <AddTimerCard onClick={handleAddTimerClicked}/>
                    </CardWrapper>
                </Row>
            </Container>
            <Footer/>
        </>

    );
};

export default MainContainer;
