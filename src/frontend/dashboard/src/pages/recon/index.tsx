import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text, View } from '../../components/Core'

type ReconProps = object

export const Recon: React.FC<ReconProps> = () => {
    const { t } = useTranslation();

    return (
        <View isPage className='w-full'>
            <Text className='text-xl font-semibold'>{t('Recon')}</Text>
            <View flexRow className=''>
            </View>
        </View>
    );
};

export default Recon;