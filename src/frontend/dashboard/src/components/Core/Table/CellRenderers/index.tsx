import { View, Text } from "../../"
import { ITheme } from "../../../../themes"
import { toSentenceCase } from "../../../../utils/casing"
import FintechIcon, { FintechType } from "../../FintechIcon"

export const StatusCircle = ({ color, status }: { color: string, status: string }) => {
    return (
        <View
            className='flex flex-row items-center p-1 px-2 mx-1 rounded-md w-fit'
            style={{
                backgroundColor: `${color}1A`,
                color
            }}>
            <Circle color={color} />
            <Text className='ml-2 rounded-md' color={color}>{toSentenceCase(status)}</Text>
        </View>
    )
}

export const Circle = ({ color }: { color: string }) => {
    return (
        <div
            className='w-2.5 h-2.5 rounded-full'
            style={{
                backgroundColor: color
            }}
        />
    )
}

export const renderTransactionStatus = ({ theme }: { t: any, theme: ITheme }) => ({ row: { original } }: { row: { original: any } }) => {
    const { status } = original;
    switch (status) {
        case 'pending':
            return <StatusCircle status={status} color={theme.warning} />;
        case 'success':
            return <StatusCircle status={status} color={theme.success} />;
        case 'failed':
            return <StatusCircle status={status} color={theme.error} />;
        default:
            return <StatusCircle status={'N / A'} color={theme.textLight} />;
    }
}

export const renderAuthStatus = ({ theme }: { t: any, theme: ITheme }) => ({ row: { original } }: { row: { original: any } }) => {
    const { authStatus } = original;
    switch (authStatus) {
        case 'authenticated':
            return <StatusCircle status={authStatus} color={theme.success} />;
        case 'unauthenticated':
            return <StatusCircle status={authStatus} color={theme.error} />;
        case 'pending':
            return <StatusCircle status={authStatus} color={theme.warning} />;
        default:
            return <StatusCircle status={'N / A'} color={theme.textLight} />;
    }
}


export const renderPaymentType = ({ }: { t: any, theme: ITheme }) => ({ row: { original } }: { row: { original: any } }) => {
    return (
        <View className='flex flex-row items-center'>
            <FintechIcon name={original.paymentType as FintechType} />
            <Text className='ml-2 opacity-50 text-sm'>({toSentenceCase(original.paymentType)})</Text>
        </View>
    )
}

export const renderFintechIcon = ({ }: { t: any, theme: ITheme }) => ({ row: { original } }: { row: { original: any } }) => {
    const { fintech } = original;
    return (
        <View className='flex flex-row items-center'>
            <FintechIcon name={fintech as FintechType} />
            <Text className='ml-2 opacity-50 text-sm'>({toSentenceCase(fintech)})</Text>
        </View>
    )
}