import React from 'react';
import { View } from '../../components/Core';
import { useTranslation } from 'react-i18next';
import AppTopBar from '../../components/App/TopBar';

type PayinsRefundsProps = object

export const PayinsRefunds: React.FC<PayinsRefundsProps> = () => {
    const { t } = useTranslation();

    return (
        <View>
            <AppTopBar title={`${t('payins')} ${t('refunds')}`} />
        </View>
    );
};

export default PayinsRefunds;
