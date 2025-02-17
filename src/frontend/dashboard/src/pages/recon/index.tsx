import React from 'react';
import { View } from '../../components/Core';
import AppTopBar from '../../components/App/TopBar';

type ReconciliationProps = object

export const Reconciliation: React.FC<ReconciliationProps> = () => {
    return (
        <View>
            <AppTopBar />
        </View>
    );
};

export default Reconciliation;
