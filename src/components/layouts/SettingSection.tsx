import React, {useCallback, useMemo, useState} from 'react';
import TabList from '../atoms/TabList';
import {Box, Card} from 'rebass';
import {Input, Label} from '@rebass/forms';
import styled from '@emotion/styled';

const TabViewCard = styled(Card)`
    margin: 8px 4px 0;
`;

const InlineLabel = styled(Label)`
    display: inline;
`;

const TimeSettingInput: React.FC<{ name: string; suffix?: string; defaultValue?: number }> = (
    {name, defaultValue, suffix}
) => (
    <Box
        marginBottom={1}
    >
        <InlineLabel
            htmlFor={`${name}-input`}
            paddingBottom={2}
            paddingRight={2}
        >{name}</InlineLabel>
        <Input
            id={`${name}-input`}
            type='number'
            defaultValue={defaultValue || 0}
            paddingRight={1}
            marginRight={2}
            width={'fit-content'}
            display={'inline-block'}
        />
        <span>{suffix}</span>
    </Box>
);

const TimeSetting: React.FC = () => (
    <TabViewCard>
        <TimeSettingInput
            name='집중시간'
            defaultValue={25}
            suffix='분'
        />
        <TimeSettingInput
            name='휴식시간'
            defaultValue={5}
            suffix='분'
        />
        <TimeSettingInput
            name='반복횟수'
            defaultValue={5}
            suffix='번'
        />
    </TabViewCard>
);

const CommonSetting: React.FC = () => (<TabViewCard>기타세팅은 추후에..</TabViewCard>);

const SettingSection: React.FC = () => {
    const [currentShowingTabName, setShowingTab] = useState<string | undefined>(undefined);

    const handleTabSelected = useCallback((item: string, activated: boolean) => {
        setShowingTab(activated ? item : undefined);
    }, []);

    const CurrentTabView = useMemo(() => {
        switch (currentShowingTabName) {
            case '시간설정':
                return <TimeSetting/>;
            case '기타설정':
                return <CommonSetting/>;
            default:
                return <></>;
        }
    }, [currentShowingTabName]);

    return (
        <>
            <TabList
                listItems={['시간설정', '기타설정']}
                onClick={handleTabSelected}
            />
            {CurrentTabView}
        </>
    );
};

export default SettingSection;
