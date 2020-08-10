import React, {useState} from 'react';
import TimerCard from '../atoms/TimerCard';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import {useSelector} from 'react-redux';
import {ReduxStore} from '../../stores';
import styled from 'styled-components';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const ContentContainer = styled.div`
    height: calc(81vh - 31px);
    display: flex;
    align-items: center;
    justify-content: center;
`;


const CarouselContainer: React.FC = () => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const timers = useSelector<ReduxStore, Timer[]>((state) => state.timer.timers);


    return (
        <>
            <Header/>
            <ContentContainer>
                    <AliceCarousel
                        mouseTrackingEnabled={true}
                        infinite={false}
                        buttonsDisabled={true}
                        stagePadding={{
                            paddingLeft: 5,
                            paddingRight: 5,
                        }}
                    >
                        {
                            timers.map(({initialSecond, title}, index) => (
                                <TimerCard
                                    initialTime={initialSecond}
                                    title={title}
                                />
                                /*<CardWrapper key={`card-${index}`}>

                                </CardWrapper>*/
                            ))
                        }
                    </AliceCarousel>
            </ContentContainer>
            <Footer/>
        </>
    );
};

export default CarouselContainer;
