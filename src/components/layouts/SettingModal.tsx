import React from 'react';
import styled from '@emotion/styled';

type IProps = {
    title?: string;
    type?: 'confirm' | 'ok' | 'none';
    onOutsideClick?: () => void;
    onConfirm?: () => void;
    onClose?: () => void;
}

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: green;
    height: 42px;
    padding: 0 8px;
    margin-bottom: 8px;
`;

const ContentContainer = styled.div`
    width: 200;
    height: calc(100% - 50px);
`;

const SettingModal: React.FC = () => {
    return (
        <div style={{height: '100%'}}>
            <TitleContainer>
                헥헥 힘드롯
            </TitleContainer>
            <ContentContainer>
                울 가영이 화이팅!!
                <img
                    src='https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_960_720.png'
                    style={{
                        width: 150,
                        height: 150,
                    }}
                />
            </ContentContainer>
        </div>
    );
};

export default SettingModal;

