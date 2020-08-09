import React, {useState} from 'react';
import TimerCard from '../atoms/TimerCard';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import {useSelector} from 'react-redux';
import {ReduxStore} from '../../stores';
import Carousel from 'react-items-carousel';
import styled from 'styled-components';

const CardWrapper = styled.div`
    padding: 10px;
    background-color: transparent;
`;

const ContentContainer = styled.div<{ chevronWidth: number }>`
    padding: 0 ${({chevronWidth}) => chevronWidth}px;
`;

const chevronWidth = 30;

const CarouselContainer: React.FC = () => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const timers = useSelector<ReduxStore, Timer[]>((state) => state.timer.timers);


    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Header/>
            <div style={{
                height: 'calc(100vh - 200px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Carousel
                    requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    numberOfCards={1}
                    gutter={20}
                    leftChevron={<button>{'<'}</button>}
                    rightChevron={<button>{'>'}</button>}
                    outsideChevron
                    chevronWidth={chevronWidth}
                >
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
                </Carousel>
            </div>
            <Footer/>
        </div>
    );
};

export default CarouselContainer;
