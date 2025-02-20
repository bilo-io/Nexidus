import { useState } from "react";
import { toSentenceCase } from "../../../utils/casing";
import { Card, Dropdown, ISelectOption, View } from "../../Core";
import Icon from "../../Core/Icon";
import { useTheme } from "../../../context/ThemeContext";

export type DataViewType = 'table' | 'charts' | 'custom';

interface ContentFiltersProps<T> {
    value: Record<keyof T, any>;
    options: { key: string, options: ISelectOption[] }[];
    onChange: (key: keyof T, value: any) => void;
    onCopyLink: () => void;
    onAdd?: () => void;
    onClear?: () => void;
    onDownload?: () => void;
    onReload?: () => void;
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
    onCopyLink,
    onClear,
    onReload,
    activeView,
    onActiveView,
    isDefaultShowFilters = true
}: ContentFiltersProps<T>) => {
    const { theme } = useTheme();
    const [isShowingFilters, setIsShowingFilters] = useState<boolean>(isDefaultShowFilters)
    const iconClassName = 'cursor-pointer size-6'

    return (
        <Card className='w-full my-4'>
            <View flex flexCol className=''>
                <View flex flexRow justify='between' className='gap-4 mt-0'>
                    <View flex flexRow className='gap-4'>
                        <Icon
                            name='TableCells'
                            onClick={() => onActiveView('table')}
                            className={iconClassName}
                            style={{
                                color: activeView === 'table' ? theme?.primary : theme?.textLight,
                            }}
                        />
                        <Icon
                            name='ChartPie'
                            onClick={() => onActiveView('charts')}
                            className={iconClassName}
                            style={{
                                color: activeView === 'charts' ? theme?.primary : theme?.textLight,
                            }}
                        />
                        <Icon
                            name='Wrench'
                            onClick={() => onActiveView('custom')}
                            className={iconClassName}
                            style={{
                                color: activeView === 'custom' ? theme?.primary : theme?.textLight,
                            }}
                        />
                    </View>
                    <View flex flexRow className='gap-4 mx-4 py-2 justify-end'>
                        <Icon name='MagnifyingGlass' className={iconClassName} />
                        {onAdd && <Icon name='Plus' className={iconClassName} onClick={onAdd} />}
                        <Icon name='AdjustmentsVertical' className={iconClassName} onClick={() => setIsShowingFilters((prev) => !prev)} />
                        {onDownload && <Icon name='ArrowDownTray' className={iconClassName} onClick={onDownload} />}
                        <Icon name='ArrowPath' className={iconClassName} onClick={onReload} />
                        <Icon name="Link" className={iconClassName} onClick={() => onCopyLink?.()} />
                        {onClear && <Icon name='XMark' className={iconClassName} onClick={onClear} />}
                    </View>
                </View>
                <div className={`flex flex-row flex-wrap items-center gap-x-4 ${isShowingFilters ? 'mt-4' : 'mt-0'} w-full`}>
                    {
                        isShowingFilters && options.map((item) => {
                            const currentValue = value[item.key as keyof T];

                            // Find the selected option that corresponds to the value
                            const selectedOption = item.options.find(option => option.value === currentValue);

                            return (
                                <div key={item.key} className="w-40">
                                    <Dropdown
                                        options={item.options || []}
                                        onChange={(e) => onChange(item.key as keyof T, e)} // Pass the full option back to onChange
                                        value={selectedOption || null} // Ensure the value is in the correct format
                                        placeholder={toSentenceCase(item.key)}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </View>
        </Card>
    );
};
