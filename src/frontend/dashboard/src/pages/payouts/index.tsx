import React from 'react';
import { View } from '../../components/Core';
import AppTopBar from '../../components/App/TopBar';
import { useTranslation } from 'react-i18next';
type PayoutsProps = object

export const Payouts: React.FC<PayoutsProps> = () => {
    const { t } = useTranslation();

    return (
        <View>
            <AppTopBar title={t('payouts')} />
        </View>
    );
};

export default Payouts;
