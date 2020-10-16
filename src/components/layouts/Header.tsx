import React, {useCallback} from 'react';
import styled from '@emotion/styled';
import {GearIcon} from '@primer/octicons-react';
import useModal from '../../hooks/useModal';
import SettingModal from './SettingModal';

const HeaderContainer = styled.div`
    background-color: #FFCB7D;
    align-items: center;
    margin: 4px;
    height: 46px;
    padding: 0 10px;
    border-radius: 8px;
`;

const HeaderFlexContentContainer = styled.div`
    display: flex;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
`;

const IconBox = styled.div`
    cursor: pointer;
    color: #787830;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
`;

const Header: React.FC = () => {
    const [setSettingModalVisible, SettingModalComponent] = useModal({component: SettingModal});

    const handleSettingIconClicked = useCallback(() => {
        setSettingModalVisible(true);
    }, []);


    return (
        <HeaderContainer>
            <HeaderFlexContentContainer>
                <IconBox onClick={handleSettingIconClicked}>
                    <GearIcon size={28} verticalAlign={'middle'} />
                </IconBox>
            </HeaderFlexContentContainer>
            <SettingModalComponent />
        </HeaderContainer>
    );
};

export default Header;
