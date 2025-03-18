import { useState } from "react";
import { Icon } from '../Icon'
import { useTheme } from "../../../context/ThemeContext";

interface CopyableProps {
    text: string;
}

export default function Copyable({ text }: CopyableProps) {
    const [copied, setCopied] = useState(false);
    const { theme } = useTheme();

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy: ", error);
        }
    };

    return (
        <div
            className="w-fit flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => copyToClipboard(text)}>
            <span className="select-all">Copy</span>
            {copied
                ? <Icon name='Check' color={theme.success} className='size-6' />
                : <Icon name='DocumentDuplicate' className={'size-6'} />
            }
        </div>
    );
}
