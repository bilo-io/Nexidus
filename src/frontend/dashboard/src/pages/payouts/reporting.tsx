import React from 'react';
import { View } from '../../components/Core';
import AppTopBar from '../../components/App/TopBar';
import { useTranslation } from 'react-i18next';

type PayoutsReportingProps = object

export const PayoutsReporting: React.FC<PayoutsReportingProps> = () => {
    const { t } = useTranslation();

    return (
        <View>
            <AppTopBar title={`${t('payouts')} ${t('reporting')}`} />
        </View>
    );
};

export default PayoutsReporting;
