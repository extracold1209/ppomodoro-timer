import React from 'react';
import styled from 'styled-components';
import TimerCard from '../atoms/TimerCard';
import {Col, Container, Row} from 'react-grid-system';

const CenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const MainContainer: React.FC = () => {

    return (
        <>
            <div>Hello MainContainer</div>
            <Container fluid>
                <Row>
                    <Col xs={12} md={6} lg={4} xl={3}>
                        <TimerCard />
                    </Col>
                    <Col xs={12} md={6} lg={4} xl={3}>
                        <TimerCard />
                    </Col>
                    <Col xs={12} md={6} lg={4} xl={3}>
                        <TimerCard />
                    </Col>
                    <Col xs={12} md={6} lg={4} xl={3}>
                        <TimerCard />
                    </Col>
                </Row>
            </Container>
        </>

    );
};

export default MainContainer;
