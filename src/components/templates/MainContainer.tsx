import React from 'react';
import {Container, Row} from 'react-grid-system';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';

const MainContainer: React.FC = () => {

    return (
        <>
            <Header/>
            <Container>
                <Row>
                    메인컨테이너
                </Row>
            </Container>
            <Footer/>
        </>

    );
};

export default MainContainer;
