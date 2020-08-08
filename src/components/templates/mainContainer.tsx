import React, {useCallback, useState} from 'react';
import TimerCard from '../atoms/TimerCard';
import {Col, Container, Row} from 'react-grid-system';
import AddTimerCard from '../atoms/AddTimerCard';

const CardWrapper: React.FC = ({children, ...props}) => (
    <Col xs={12} md={6} lg={4} xl={3} {...props}>
        {children}
    </Col>
);

const MainContainer: React.FC = () => {
    const [dummyDatum, setDummyDatum] = useState([10, 15, 20, 25]);

    const handleAddTimerClicked = useCallback(() => {
        setDummyDatum([...dummyDatum, Math.random() * 100 % 60]);
    }, [dummyDatum]);

    return (
        <>
            <div>Hello MainContainer</div>
            <Container fluid>
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
        </>

    );
};

export default MainContainer;
