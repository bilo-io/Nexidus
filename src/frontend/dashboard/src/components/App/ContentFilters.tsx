import { Dropdown } from "../Core";

interface ContentFiltersProps<T> {
    value: Record<keyof T, any>;
    options: Record<keyof T, { label: string; value: any }[]>; // Options for each filter
    onChange: (key: keyof T, value: any) => void; // Change handler
}

export const ContentFilters = <T,>({ value, options, onChange }: ContentFiltersProps<T>) => {
    return (
        <div className="flex flex-row items-center gap-x-2 space-4">
            {Object.keys(value).map((key) => (
                <div key={key} className="w-full md:w-1/4 lg:w-1/6">
                    <Dropdown
                        options={options[key as keyof T] || []}
                        onChange={(e) => onChange(key as keyof T, e)}
                        value={value[key as keyof T]}
                    />
                </div>
            ))}
        </div>
    );
};
