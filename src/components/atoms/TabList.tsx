import React, {useCallback, useState} from 'react';
import {Box, Flex} from 'rebass';
import styled from '@emotion/styled';

type Props = {
    listItems: string[];
    onClick?: (item: string, activated: boolean) => void;
    hoverBackground?: string;
    selectBackground?: string;
}

const ItemTab = styled<typeof Box, {
    isActivate: boolean
    hoverBackground: string;
    selectBackground: string;
}>(Box)`
    cursor: pointer;
    margin: 0 4px;
    padding: 12px;
    background-color: ${({isActivate, selectBackground}) => isActivate ? selectBackground : 'transparent'};
    color: ${({isActivate}) => isActivate ? 'white' : 'black'};
    
    &:hover {
        background-color: ${({hoverBackground}) => hoverBackground};
        color: white;
    }
`;

const TabList: React.FC<Props> = ({listItems, onClick, hoverBackground= 'darkseagreen', selectBackground = 'black'}) => {
    const [currentSelected, setCurrentSelected] = useState<string | undefined>(undefined);
    const handleTabClicked = useCallback((item: string) => () => {
        // 만약 이미 선택된 탭을 다시 누르면 deactivate 된다.
        const isActivateSelect = !currentSelected || currentSelected !== item;

        onClick?.(item, isActivateSelect);
        setCurrentSelected(isActivateSelect ? item : undefined);
    }, [currentSelected]);

    return (
        <Flex>
            {
                listItems.map((item) => (
                    <ItemTab
                        key={item}
                        onClick={handleTabClicked(item)}
                        isActivate={item === currentSelected}
                        hoverBackground={hoverBackground}
                        selectBackground={selectBackground}
                    >
                        {item}
                    </ItemTab>
                ))
            }
        </Flex>
    );
};

export default TabList;
