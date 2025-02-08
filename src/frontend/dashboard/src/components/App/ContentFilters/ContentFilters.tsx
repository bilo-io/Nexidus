import { useState } from "react";
import { toSentenceCase } from "../../../utils/casing";
import { Card, Dropdown, View } from "../../Core";
import Icon from "../../Core/Icon";
import { useTheme } from "../../../context/ThemeContext";

export type DataViewType = 'table' | 'chart-pie' | 'chart-bar';

interface ContentFiltersProps<T> {
    value: Record<keyof T, any>;
    options: Record<keyof T, { label: string; value: any }[]>; // Options for each filter
    onChange: (key: keyof T, value: any) => void;
    onAdd?: () => void;
    onDownload?: () => void;
    activeView: DataViewType;
    onActiveView: (view: DataViewType) => void;
    isDefaultShowFilters?: boolean;
}

export const ContentFilters = <T,>({
    value,
    options,
    onChange,
    onAdd,
    onDownload,
    activeView,
    onActiveView,
    isDefaultShowFilters = true
}: ContentFiltersProps<T>) => {
    const { theme } = useTheme();
    const [isShowingFilters, setIsShowingFilters] = useState<boolean>(isDefaultShowFilters)
    const keys = Object.keys(options);

    console.log(keys, options)

    return (
        <Card className='w-full'>
            <View flex flexCol className=''>
                <View flex flexRow justify='between' className='gap-4 my-2'>
                    <View flex flexRow className='gap-4 my-2'>
                        <Icon
                            name='ChartBar'
                            onClick={() => onActiveView('chart-bar')}
                            className='size-8'
                            style={{
                                color: activeView === 'chart-bar' ? theme?.primary : theme?.text,
                            }}
                        />
                        <Icon
                            name='TableCells'
                            onClick={() => onActiveView('table')}
                            className='size-8'
                            style={{
                                color: activeView === 'table' ? theme?.primary : theme?.text,
                            }}
                        />
                        <Icon
                            name='ChartPie'
                            onClick={() => onActiveView('chart-pie')}
                            className='size-8'
                            style={{
                                color: activeView === 'chart-pie' ? theme?.primary : theme?.text,
                            }}
                        />
                    </View>
                    <View flex flexRow className='gap-4 mx-4 py-2 justify-end'>
                        <Icon name='MagnifyingGlass' className='size-6' />
                        {onAdd && <Icon name='Plus' className='size-6' onClick={onAdd} />}
                        <Icon name='AdjustmentsVertical' className='size-6' onClick={() => setIsShowingFilters((prev) => !prev)} />
                        {onDownload && <Icon name='ArrowDownTray' className='size-6' onClick={onDownload} />}
                    </View>
                </View>
                <div className="flex flex-row items-center gap-x-4  w-full">
                    {isShowingFilters && keys.map((key) => (
                        // <div key={key} className="w-full md:w-1/4 lg:w-1/6">
                        <div key={key} className="">
                            <Dropdown
                                options={options[key as keyof T] || []}
                                onChange={(e) => onChange(key as keyof T, e)}
                                value={value[key as keyof T]}
                                placeholder={toSentenceCase(key)}
                            />
                        </div>
                    ))}
                </div>
            </View>
        </Card>
    );
};
