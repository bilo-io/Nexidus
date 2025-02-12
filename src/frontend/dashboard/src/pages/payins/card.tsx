import React from 'react';
import { View } from '../../components/Core';
import AppTopBar from '../../components/App/TopBar';
import { useTranslation } from 'react-i18next';

type PayinsCardProps = object

export const PayinsCard: React.FC<PayinsCardProps> = () => {
    const { t } = useTranslation();

    return (
        <View>
            <AppTopBar title={`${t('payins')} ${t('card')}`} />
        </View>
    );
};

export default PayinsCard;
