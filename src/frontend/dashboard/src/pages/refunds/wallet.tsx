import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text, View } from '../../components/Core'

type RefundsWalletProps = object

export const RefundsWallet: React.FC<RefundsWalletProps> = () => {
    const { t } = useTranslation();

    return (
        <View isPage className='w-full'>
            <Text className='text-xl font-semibold'>{t('RefundsWallet')}</Text>
            <View flexRow className=''>
            </View>
        </View>
    );
};

export default RefundsWallet;