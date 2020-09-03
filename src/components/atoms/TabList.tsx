import React, {useCallback, useState} from 'react';
import {Button, Flex} from 'rebass';
import styled from '@emotion/styled';
import {DefaultTheme} from '../../constants/theme';

type Props = {
    listItems: string[];
    onClick?: (item: string, activated: boolean) => void;
    hoverBackground?: string;
    selectBackground?: string;
}

const ItemTab = styled<typeof Button, {
    theme: DefaultTheme,
    isActivate: boolean
}>(Button)`
    padding: ${({theme}) => theme.space[2]}px;
    background-color: ${({theme, isActivate}) => isActivate ? theme.colors.primary : 'transparent'};
    ${({isActivate}) => isActivate && 'color: white;'};

    &:focus {
        outline: none;
    }
    
    &:hover {
        background-color: ${({theme}) => theme.colors.primaryLight};
        color: white;
    }
    
    &:not(:last-child) {
        margin-right: ${({theme}) => theme.space[1]}px;
    }
`;

const TabList: React.FC<Props> = ({listItems, onClick}) => {
    const [currentSelected, setCurrentSelected] = useState<string | undefined>(undefined);
    const handleTabClicked = useCallback((item: string) => () => {
        // 만약 이미 선택된 탭을 다시 누르면 deactivate 된다.
        const isActivateSelect = !currentSelected || currentSelected !== item;

        onClick?.(item, isActivateSelect);
        setCurrentSelected(isActivateSelect ? item : undefined);
    }, [currentSelected]);

    return (
        <Flex
            marginBottom={2}
        >
            {
                listItems.map((item) => (
                    <ItemTab
                        variant={'outline'}
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
