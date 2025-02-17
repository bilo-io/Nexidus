import React from 'react';
import { View } from '../../components/Core';
import AppTopBar from '../../components/App/TopBar';

type RefundsCardProps = object

export const RefundsCard: React.FC<RefundsCardProps> = () => {
    return (
        <View>
            <AppTopBar />
        </View>
    );
};

export default RefundsCard;
