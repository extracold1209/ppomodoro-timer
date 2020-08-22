import React, {useCallback} from 'react';
import TimerCard from '../atoms/TimerCard';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../stores';
import styled from 'styled-components';
import AliceCarousel, {EventObject} from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {selectTimerIndex, TimerReducer, TimerStatusEnum} from '../../stores/timer';

const ContentContainer = styled.div`
    height: calc(81vh - 31px);
    min-height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
`;


const CarouselContainer: React.FC = () => {
    const {
        timers,
        status: timerStatus,
        currentSelectedTimerIndex: currentTimerIndex
    } = useSelector<RootState, TimerReducer>((state) => state.timer);
    const dispatch = useDispatch();

    const handleOnSlideChanged = useCallback((e: EventObject) => {
        dispatch(selectTimerIndex(e.item));
    }, []);

    return (
        <>
            <Header/>
            <ContentContainer>
                <AliceCarousel
                    startIndex={currentTimerIndex}
                    mouseTrackingEnabled={true}
                    infinite={false}
                    swipeDisabled={timerStatus === TimerStatusEnum.RUNNING}
                    dotsDisabled={timerStatus === TimerStatusEnum.RUNNING}
                    buttonsDisabled={true}
                    stagePadding={{
                        paddingLeft: 5,
                        paddingRight: 5,
                    }}
                    onSlideChanged={handleOnSlideChanged}
                >
                    {
                        timers.map(({initialSecond, title}, index) => (
                            <TimerCard
                                key={`${title}-${index}`}
                                initialTime={initialSecond}
                                title={title}
                            />
                        ))
                    }
                </AliceCarousel>
            </ContentContainer>
            <Footer/>
        </>
    );
};

export default CarouselContainer;
