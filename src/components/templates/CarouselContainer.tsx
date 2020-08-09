import React, {useState} from 'react';
import TimerCard from '../atoms/TimerCard';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import {useSelector} from 'react-redux';
import {ReduxStore} from '../../stores';
import Carousel from 'react-items-carousel';
import styled from 'styled-components';

const CardWrapper = styled.div`
    display: flex;
    padding: 10px;
    background-color: transparent;
`;

const ContentContainer = styled.div<{ chevronWidth: number }>`
    padding: 0 ${({chevronWidth}) => chevronWidth}px;
    height: 80%;
`;

const chevronWidth = 30;

const CarouselContainer: React.FC = () => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const timers = useSelector<ReduxStore, Timer[]>((state) => state.timer.timers);


    return (
        <>
            <Header/>
                <ContentContainer
                    chevronWidth={chevronWidth}
                >
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
                </ContentContainer>
            <Footer/>
        </>
    );
};

export default CarouselContainer;
