import React, {useCallback} from 'react';
import styled from 'styled-components';
import {BiPlusCircle} from 'react-icons/bi';
import {useDispatch} from 'react-redux';
import {addTimer} from '../../stores/timer';

const HeaderContainer = styled.header`
    display:flex;
    justify-content: center;
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: rgb(245, 195, 64);
    top: 0;
    left: 0;
    height: 4vh;
`;

const PlusCircleWrapper = styled.div`
    cursor: pointer;
    display: flex;
    position: absolute;
    right: 10px;
`;

const Header: React.FC = () => {
    const dispatch = useDispatch();

    const handleCircleClicked = useCallback(() => {
        dispatch(addTimer({title: '아무거나', initialSecond: parseInt((Math.random() * 100).toFixed(0))}));
    }, []);

    return (
        <HeaderContainer>
            Hello?
            <PlusCircleWrapper onClick={handleCircleClicked}>
                <BiPlusCircle size={24}/>
            </PlusCircleWrapper>
        </HeaderContainer>
    );
};

export default Header;
