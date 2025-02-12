import React from 'react';
import { View } from '../../components/Core';
import { useTranslation } from 'react-i18next';
import AppTopBar from '../../components/App/TopBar';

type PayinsWalletProps = object

export const PayinsWallet: React.FC<PayinsWalletProps> = () => {
    const { t } = useTranslation();

    return (
        <View>
            <AppTopBar title={`${t('payins')} ${t('wallet')}`} />
        </View>
    );
};

export default PayinsWallet;
