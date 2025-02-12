import React from 'react';
import { View } from '../../components/Core';
import AppTopBar from '../../components/App/TopBar';

type UnallocatedFundsProps = object

export const UnallocatedFunds: React.FC<UnallocatedFundsProps> = () => {


    return (
        <View>
            <AppTopBar title={'unallocatedFunds'} />
        </View>
    );
};

export default UnallocatedFunds;
