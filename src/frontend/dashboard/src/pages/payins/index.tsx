import React from 'react';
import { View } from '../../components/Core';
import { useTranslation } from 'react-i18next';
import AppTopBar from '../../components/App/TopBar';

type PayinsProps = object

export const Payins: React.FC<PayinsProps> = () => {
    const { t } = useTranslation();
    
    return (
        <View>
            <AppTopBar title={`${t('payins')}`} />
        </View>
    );
};

export default Payins;
