import React from 'react'

interface KeyValueViewProps {
    heading?: string;
    data: Record<string, any>;
    viewType: 'table' | 'description';
}

export const KeyValueView: React.FC<KeyValueViewProps> = ({ heading, data, viewType }) => {
    if (data === null || data === undefined) {
        return null;
    }

    return (
        <div className="key-value-view">
            {heading && (
                <div className='font-bold text-lg mb-2'>
                    {heading}
                </div>
            )}

            {
                viewType === 'table' ? (
                    <table className='relative w-full'>
                        {/* <thead>
                            <tr>
                                <th>Key</th>
                                <th>Value</th>
                            </tr>
                        </thead> */}
                        <tbody>
                            {Object.entries(data).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : null
            }

            {
                viewType === 'description' ? (
                    <dl className='relative w-full'>
                        {Object.entries(data).map(([key, value]) => (
                            <div key={key}>
                                <dt>{key}</dt>
                                <dd>{value}</dd>
                            </div>
                        ))}
                    </dl>
                ) : null
            }
        </div>
    );
};