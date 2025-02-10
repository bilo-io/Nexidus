import { useState } from "react";
import { Card, DateRangePicker, Dropdown } from "../Core";
import Icon from "../Core/Icon";
import { useTheme } from "../../context/ThemeContext";

interface GlobalFiltersProps {
    onChange?: (arg: any) => void; 
    value: Record<string, any>;
}

export type IFiatCurrency = 'ZAR' | 'USD' | 'EUR'

interface IDateRange {
    startDate: string;
    endDate: string;
}

const currencyOptions: {
    label: string,
    value: IFiatCurrency
}[] = [
    {
        label: 'ZAR - South African Rands',
        value: 'ZAR'
    },
    {
        label: 'USD - US Dollar',
        value: 'USD'
    },
    {
        label: 'EUR - Euro',
        value: 'EUR'
    }
]

export const GlobalFilters = ({ onChange }: GlobalFiltersProps) => {
    const { theme } = useTheme();
    const [currency, setCurrency] = useState<IFiatCurrency>('ZAR')
    const [, setDateRange] = useState<IDateRange>({
        startDate: '',
        endDate: '',
    })

    return (

        <Card className='my-4 w-full flex flex-row items-center gap-x-4'>
            <Icon name="GlobeAlt" className='size-8' color={theme.textLight} />
            <div className='w-full md:w-1/4 lg:w-1/6'>
                <Dropdown
                    options={currencyOptions}
                    onChange={(e) => {
                        setCurrency(e as IFiatCurrency)
                        onChange?.({
                            currency: e.value
                        })
                    }}
                    value={currency}
                />
            </div>
            <Icon name="Calendar" className='size-8' color={theme.textLight} />
            <div className='w-full md:w-1/4 lg:w-1/6'>
                <DateRangePicker
                    onChange={(range: IDateRange): void => setDateRange(range)}
                />
            </div>
        </Card>

    );
};
