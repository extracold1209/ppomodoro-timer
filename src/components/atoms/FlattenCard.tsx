import React from 'react';
import styled from 'styled-components';
import useTimer from '../../hooks/useTimer';

const CardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px 5px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    background-color: white;
`;

const HeaderContainer = styled.div`
    align-content: space-between;
    display: flex;
    min-height: 10vh;
`;

const HeaderButtonContainer = styled.div`
    display: flex;
    position: absolute;
    right: 0;
    padding-right: 20px;
`;

const HeaderTitleContainer = styled.div`
    display: flex;
`;

const ContentContainer = styled.div`
    display: flex;
`;

const FlattenCard: React.FC<{ timer: Timer }> = (props) => {
    const {timer} = props;
    const {title, initialSecond} = timer;
    const [start, stop, remainSeconds] = useTimer(initialSecond);

    return (
        <CardContainer>
            <HeaderContainer>
                <HeaderTitleContainer>
                    {title || '타이틀이 없어욧'}
                </HeaderTitleContainer>
                <HeaderButtonContainer>
                    <button onClick={() => {
                        start();
                    }}>실행
                    </button>
                    <button onClick={() => {
                        stop();
                    }}>정지
                    </button>
                </HeaderButtonContainer>
            </HeaderContainer>
            <ContentContainer>
                {remainSeconds} / {initialSecond}
            </ContentContainer>
        </CardContainer>
    );
};

export default FlattenCard;
