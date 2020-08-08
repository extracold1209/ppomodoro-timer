import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import TimerCard from '../atoms/TimerCard';
import {Col, Container, Row} from 'react-grid-system';
import AddTimerCard from '../atoms/AddTimerCard';

const CenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

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
                            <Col xs={12} md={6} lg={4} xl={3} key={`card-${index}`}>
                                <TimerCard initialTime={data}/>
                            </Col>
                        ))
                    }
                    <Col xs={12} md={6} lg={4} xl={3}>
                        <AddTimerCard onClick={handleAddTimerClicked}/>
                    </Col>
                </Row>
            </Container>
        </>

    );
};

export default MainContainer;
