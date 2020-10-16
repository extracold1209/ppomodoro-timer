import React from 'react';
import styled from '@emotion/styled';

type IProps = {
    title?: string;
    type?: 'confirm' | 'ok' | 'none';
    onOutsideClick?: () => void;
    onConfirm?: () => void;
    onClose?: () => void;
}

const HEADER_HEIGHT = 52;
const FOOTER_HEIGHT = 52;

const Container = styled.div`
    height: calc(100% - ${FOOTER_HEIGHT}px - ${HEADER_HEIGHT}px);
    margin: 0 15px;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    height: ${HEADER_HEIGHT}px;
    margin: 0 15px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 56px);
    border-top: 1px solid rgba(182, 165, 166, 0.2);
`;

const BottomContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: grey;
    height: ${FOOTER_HEIGHT}px;
    padding: 0 12px;
`;

const SettingSection = styled.div`
    border-bottom: 1px solid rgba(182, 165, 166, 0.2);
    padding-bottom: 12px;
    padding-top: 12px;
`;

const Button = styled.button`
    display: flex;
    float: right;
    padding: 6px 14px;
`;

const InputLabel = styled.label`
    margin-right: 8px;
`;

const SettingModal: React.FC = () => {
    return (
        <>
            <TitleContainer>
                세팅
            </TitleContainer>
            <Container>
                <ContentContainer>
                    <SettingSection>
                        <span>시간 설정</span>
                        <div>
                            <InputLabel htmlFor={'setting__work-time'}>
                                업무시간
                            </InputLabel>
                            <input type='number' id={'setting__work-time'}/>
                        </div>
                        <div>
                            <InputLabel htmlFor={'setting__rest-time'}>
                                휴식시간
                            </InputLabel>
                            <input type='number' id={'setting__rest-time'}/>
                        </div>
                    </SettingSection>
                    <SettingSection>
                        울 짜기 !! <img
                            src='https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_960_720.png'
                            style={{
                                width: 150,
                                height: 150,
                            }}
                        />
                        공부 수고많아쭁 !!
                    </SettingSection>
                </ContentContainer>
            </Container>
            <BottomContainer>
                <Button>섹스</Button>
            </BottomContainer>
        </>
    );
};

export default SettingModal;

