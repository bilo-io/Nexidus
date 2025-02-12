import React from 'react';
import { View } from '../../components/Core';
import AppTopBar from '../../components/App/TopBar';

type ReconSettlementsProps = object

export const ReconSettlements: React.FC<ReconSettlementsProps> = () => {


    return (
        <View>
            <AppTopBar title={'settlements'} />
        </View>
    );
};

export default ReconSettlements;
