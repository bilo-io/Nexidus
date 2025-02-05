import { toSentenceCase } from "../../../utils/casing";
import { Dropdown } from "../../Core";

interface ContentFiltersProps<T> {
    value: Record<keyof T, any>;
    options: Record<keyof T, { label: string; value: any }[]>; // Options for each filter
    onChange: (key: keyof T, value: any) => void; // Change handler
}

export const ContentFilters = <T,>({ value, options, onChange }: ContentFiltersProps<T>) => {

    const keys = Object.keys(options);

    console.log(keys, options)
    
    return (
        <div className="flex flex-row items-center gap-x-4 my-8 space-4 w-full">
            {keys.map((key) => (
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
    );
};
