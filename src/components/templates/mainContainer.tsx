import React, {useCallback, useState} from 'react';
import {floor} from 'lodash';
import TimerCard from '../atoms/TimerCard';
import {Col, Container, Row} from 'react-grid-system';
import AddTimerCard from '../atoms/AddTimerCard';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';

const CardWrapper: React.FC = ({children, ...props}) => (
    <Col xs={12} md={6} lg={4} xl={3} {...props}>
        <div style={{padding: 5}}>
            {children}
        </div>
    </Col>
);

const MainContainer: React.FC = () => {
    const [dummyDatum, setDummyDatum] = useState([10, 15, 20, 25]);

    const handleAddTimerClicked = useCallback(() => {
        setDummyDatum([...dummyDatum, floor(Math.random() * 100 % 60)]);
    }, [dummyDatum]);

    return (
        <>
            <Header/>
            <Container>
                <Row>
                    {
                        dummyDatum.map((data, index) => (
                            <CardWrapper key={`card-${index}`}>
                                <TimerCard initialTime={data}/>
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
