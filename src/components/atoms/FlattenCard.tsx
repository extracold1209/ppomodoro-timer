import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import useTimer from '../../hooks/useTimer';
import {BiCog, BiPlayCircle, BiStopCircle, BiXCircle} from 'react-icons/bi';
import useAudio from '../../hooks/useAudio';
import {useDrag, useDrop, XYCoord} from 'react-dnd';
import {changeTimerOrder} from '../../stores/timer';
import {useDispatch} from 'react-redux';

const CardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 25px 15px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    background-color: white;
`;

const HeaderContainer = styled.div`
    align-content: space-between;
    display: flex;
    min-height: 10vh;
    font-size: 18px;
`;

const HeaderIconContainer = styled.div`
    display: flex;
    position: absolute;
    right: 15px;
    padding-right: 10px;
    
    > *:not(:last-child) {
        margin-right: 5px;
    }
`;

const HeaderTitleContainer = styled.div`
    display: flex;
`;

const ContentContainer = styled.div`
    display: flex;
    font-size: 32px;
`;

type DragItem = {
    index: number
    id: string
    type: string
}

const FlattenCard: React.FC<{ timer: Timer, onDelete?: () => void, index?: number }> = (props) => {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const {timer, index, onDelete} = props;
    const {title, initialSecond} = timer;

    const [, drop] = useDrop({
        accept: 'FlattenCard',
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index || 0;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            // moveCard(dragIndex, hoverIndex)
            dispatch(changeTimerOrder([dragIndex, hoverIndex]));
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        }
    });

    const [, drag] = useDrag({
        item: {
            type: 'FlattenCard',
            ...props
        },
    });
    const [start, stop, remainSeconds] = useTimer(initialSecond);
    const [isPlaying, toggle] = useAudio('/public/sounds/dudungtak.mp3');
    const [isTimerRunning, setTimerStatus] = useState(false);

    const handlePlayButtonClicked = useCallback(() => {
        setTimerStatus(true);
        start();
    }, []);

    const handleStopButtonClicked = useCallback(() => {
        setTimerStatus(false);
        stop();
    }, []);

    useEffect(() => {
        if (remainSeconds === 0) {
            toggle();
        }
    }, [remainSeconds]);

    const handleDeleteButtonClicked = useCallback(() => {
        onDelete?.();
    }, []);

    drag(drop(ref));
    return (
            <CardContainer ref={ref}>
                <HeaderContainer>
                    <HeaderTitleContainer>
                        {title || '타이틀이 없어욧'}
                    </HeaderTitleContainer>
                    <HeaderIconContainer>
                        <BiCog size={24}/>
                        {
                            isTimerRunning
                                ? <BiStopCircle size={24} onClick={handleStopButtonClicked}/>
                                : <BiPlayCircle size={24} onClick={handlePlayButtonClicked}/>
                        }
                        <BiXCircle size={24} onClick={handleDeleteButtonClicked}/>
                    </HeaderIconContainer>
                </HeaderContainer>
                <ContentContainer>
                    {remainSeconds} / {initialSecond}
                </ContentContainer>
            </CardContainer>
    );
};

export default FlattenCard;
