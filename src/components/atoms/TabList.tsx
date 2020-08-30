import React, {useCallback, useState} from 'react';
import {Box, Flex} from 'rebass';
import styled from '@emotion/styled';

type Props = {
    listItems: string[];
    onClick?: (item: string, activated: boolean) => void;
}

const ItemTab = styled<typeof Box, {isActivate: boolean}>(Box)`
    cursor: pointer;
    margin: 0 4px;
    padding: 12px;
    background-color: ${({isActivate}) => isActivate ? 'black' : 'transparent'};
    color: ${({isActivate}) => isActivate ? 'white' : 'black'};
    
    &:hover {
        background-color: darkseagreen;
        color: white;
    }
`;

const TabList: React.FC<Props> = ({listItems, onClick}) => {
    const [currentSelected, setCurrentSelected] = useState<string | undefined>(undefined);
    const handleTabClicked = useCallback((item: string) => () => {
        // 만약 이미 선택된 탭을 다시 누르면 deactivate 된다.
        const isActivateSelect = !currentSelected || currentSelected !== item;

        onClick?.(item, isActivateSelect);
        if (isActivateSelect) {
            setCurrentSelected(item);
        } else {
            setCurrentSelected(undefined);
        }
    }, [currentSelected]);

    return (
        <Flex>
            {
                listItems.map((item) => (
                    <ItemTab
                        key={item}
                        onClick={handleTabClicked(item)}
                        isActivate={item === currentSelected}
                    >
                        {item}
                    </ItemTab>
                ))
            }
        </Flex>
    );
};

export default TabList;
