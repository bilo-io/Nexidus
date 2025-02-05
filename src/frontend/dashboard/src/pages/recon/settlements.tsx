import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text, View } from '../../components/Core'

type ReconSettlementsProps = object

export const ReconSettlements: React.FC<ReconSettlementsProps> = () => {
    const { t } = useTranslation();

    return (
        <View isPage className='w-full'>
            <Text className='text-xl font-semibold'>{t('ReconSettlements')}</Text>
            <View flexRow className=''>
            </View>
        </View>
    );
};

export default ReconSettlements;