import React from 'react'; import { KeyValueView } from '../../components/Core/KeyValueView/KeyValueView';
import { t } from 'i18next';
import { useParams } from 'react-router-dom';
import AppTopBar from '../../components/App/TopBar';
import { View } from '../../components/Core';
import { useNexidusApi } from '../../hooks/useNexidusApi';
import { ICard, IPayer, ITransaction } from '../../../../../api/gateway/src/models/finance';

interface TransactionDetailsProps {

}

export const TransactionDetails: React.FC<TransactionDetailsProps> = () => {
    const { id } = useParams<{ id: string }>();

    const {
        data: transactionData,
        error: cardsError,
        loading: cardsLoading,
        retry: cardsRetry
    } = useNexidusApi<ITransaction>({
        path: `/api/transactions/${id}`,
    });

    // @ts-ignore
    const { cardId, payerId } = (transactionData as ITransaction) || {};

    console.log({ cardId, payerId, transactionData })

    const {
        data: cardData
    } = useNexidusApi<ICard>({
        path: `/api/cards/${cardId}`,
        enabled: !!cardId
    })

    const {
        data: payerData
    } = useNexidusApi<IPayer>({
        path: `/api/payers/${payerId}`,
        enabled: !!payerId
    })

    // console.log({ cardId, payerId })

    return (
        <View isPage>
            <AppTopBar />

            <View className='pb-20' />

            <View isPageContent className='flex flex-row gap-12'>
                <View className='w-2/3'>
                    <KeyValueView
                        data={{}}
                        heading='Transaction Details'
                        viewType={'table'}
                    />
                </View>

                <View className='flex flex-col w-1/3 gap-12'>
                    <KeyValueView
                        data={cardData}
                        heading='Card Details'
                        viewType={'table'}
                    />
                    <KeyValueView
                        data={payerData}
                        heading='Payer Details'
                        viewType={'table'}
                    />
                </View>
            </View>
        </View>
    )
}

export default TransactionDetails;
