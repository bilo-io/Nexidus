import React from 'react';
import { View } from '../../components/Core';
import AppTopBar from '../../components/App/TopBar';

type RefundsWalletProps = object

export const RefundsWallet: React.FC<RefundsWalletProps> = () => {
    return (
        <View>
            <AppTopBar />
        </View>
    );
};

export default RefundsWallet;
