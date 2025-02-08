import { useState } from "react";
import { Card, DateRangePicker, Dropdown } from "../Core";

interface GlobalFiltersProps {
    value: Record<string, any>;
}

type IFiatCurrency = 'ZAR' | 'USD' | 'EUR'

interface IDateRange {
    startDate: string;
    endDate: string;
}

const currencyOptions = [
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

export const GlobalFilters = ({ }: GlobalFiltersProps) => {
    const [currency, setCurrency] = useState<IFiatCurrency>('ZAR')
    const [, setDateRange] = useState<IDateRange>({
        startDate: '',
        endDate: '',
    })

    return (

        <Card className='w-full flex flex-row items-center gap-x-4'>
            <div className='w-full md:w-1/4 lg:w-1/6'>
                <Dropdown
                    options={currencyOptions}
                    onChange={(e) => setCurrency(e as IFiatCurrency)}
                    value={currency}
                />
            </div>
            <div className='w-full md:w-1/4 lg:w-1/6'>
                <DateRangePicker
                    onChange={(range: IDateRange): void => setDateRange(range)}
                />
            </div>
        </Card>

    );
};
