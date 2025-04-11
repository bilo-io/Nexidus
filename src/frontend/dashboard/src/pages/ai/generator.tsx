import { useState } from "react";
import AppTopBar from "../../components/App/TopBar";

import { Async, Button, Dropdown, Icon, Input, ISelectOption, Text, View } from "../../components/Core";

type TransactionsProps = object

import { generate } from "../../utils/openai";
import { extractCodeLanguage, removeMarkdownCodeBlock } from "../../utils/markdown";
import Markdown from "../../components/Core/Markdown/Markdown";
import Copyable from "../../components/Core/Copyable/Copyable";
import { schemas } from "../../utils/schemas";
import { useTheme } from "../../context/ThemeContext";
import Accordion from "../../components/Core/Accordion/Accordion";
import { databases } from "../../utils/databases";
import { getValidExtension } from "../../utils/download";

export interface IScriptList {
    name: string;
    data: string;
}

export const AIGenerator: React.FC<TransactionsProps> = () => {
    const [apiKey, setApiKey] = useState<string>(localStorage.getItem('openai-api-key') || '')
    const [clientId, setClientId] = useState<string | null>(null)
    const [tables, setTables] = useState<string[]>([])
    const [script, setScript] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [numEntries, setNumEntries] = useState<number>(5)
    const [databaseType, setDatabaseType] = useState<ISelectOption>({
        label: databases[0],
        value: databases[0]
    })
    const [extension, setExtension] = useState<string>('')

    const { theme } = useTheme();

    const optionsDBTables = Object.keys(schemas).sort().map((table: string) => ({
        label: table,
        // @ts-ignore
        value: schemas[table]
    }))

    const prompt = `
Create a ${databaseType.value} script inserting ${numEntries} entries into the tables: ${
        // @ts-ignore
        tables.map((item) => item.label).join(',')
        }.

The clientID is ${clientId}. Please use realistic guids for IDs.

Schemas are:
${  // @ts-ignore
        tables.map((item) => schemas[item.label]).join('\n')
        }

please just respond with the raw ${databaseType.value}, and I just want the query, nothing else.
            `
    const handleGenerate = async () => {
        setLoading(true);

        console.log(prompt)
        
        const response = await generate({
            fake: false,
            prompt
        })

        setLoading(false);

        setScript(response as string)

        const fileExtension = extractCodeLanguage(response as string)
        setExtension(fileExtension as string)
    }

    const handleDownload = () => {
        if (!script) {
            alert('no script to download')
            return;
        }

        // else download it as a .sql file
        const element = document.createElement('a');
        const file = new Blob([removeMarkdownCodeBlock(script)], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `database_seed_${new Date().toISOString()}.${getValidExtension(extension)}`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    const handleSetApiKey = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApiKey(e.target.value)
        localStorage.setItem('openai-api-key', e.target.value)
    }

    const handleDeleteApiKey = () => {
        setApiKey('')
        localStorage.removeItem('openai-api-key')
    }

    const saveToLocalStorage = () => {
        const scripts = JSON.parse(localStorage.getItem('saved-db-scripts') || '[]') as IScriptList[]
        scripts.push({
            name: `database_seed_${new Date().toISOString()}.${getValidExtension(extension)}`,
            data: script
        })

        localStorage.setItem('saved-db-scripts', JSON.stringify(scripts
            .filter((item: IScriptList, index: number, self: IScriptList[]) =>
                index === self.findIndex((t) => (
                    t.name === item.name
                ))
            )
        ))
    }

    return (
        <View isPage>
            <AppTopBar />

            <View className='pb-20' />

            {false &&
                <View className='mx-auto max-w-3xl mb-4'>
                    <Accordion title='OpenAI API Key'>
                        <View className='w-full flex flex-row gap-2'>
                            <Input value={apiKey} onChange={handleSetApiKey} className='flex-grow' />
                            <Button>
                                Save
                            </Button>
                            <Button onClick={handleDeleteApiKey} color={theme.error}>
                                <Icon name='Trash' className='size-6' color={'#FFF'} />
                            </Button>
                        </View>
                    </Accordion>
                </View>
            }

            {apiKey && (
                <View isPageContent className="mx-auto max-w-3xl">
                    <View flex flexCol>
                        <Text>1. Please enter a <code style={{ color: theme.primary }}>clientID</code> for which to generate data.</Text>
                        <Input
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            placeholder='Client ID'
                            className="mt-1"
                        />
                        <br />
                        <br />
                        <Text>2. Choose database tables to create a "seed" script for.</Text>
                        <View>
                            <Dropdown
                                options={optionsDBTables}
                                value={tables}
                                onChange={(e) => setTables(e)}
                                isMulti
                            />
                        </View>
                        <br />
                        <br />
                        <View className='w-full flex flex-row items-center justify-between'>
                            <View className='w-full'>
                                <Text>3. How many entries do you want? &nbsp;&nbsp;</Text>
                                <View className='flex flex-row items-center gap-2'>
                                    <Input
                                        value={numEntries}
                                        type={'number'}
                                        className='w-24'
                                        max={1000}
                                        onChange={(e) => setNumEntries(Number(e.target.value))}
                                        placeholder='Client ID'
                                    />
                                    <View className='w-44'>
                                        <Dropdown
                                            options={databases?.map((item: string) => ({
                                                label: item,
                                                value: item
                                            }))}
                                            value={databaseType}
                                            onChange={(item) => {
                                                setDatabaseType(item)
                                            }}
                                        />
                                    </View>

                                    <View className="flex-grow" />

                                    <Button className='w-fit' onClick={handleGenerate}>
                                        <View className='flex flex-row'>
                                            <Icon name={'Sparkles'} className="mr-4 size-6" />
                                            <Text color={'#FFF'}>Generate SQL Script</Text>
                                        </View>
                                    </Button>
                                </View>
                            </View>


                        </View>
                        <br />

                    </View>
                    <br />
                    <Async loading={loading} error={null}>
                        {script && (
                            <View className='relative w-full card px-4'>
                                <View className='absolute right-4 card p-2 mt-4 mb-12 flex flex-row gap-2 z-10'
                                    style={{
                                        boxShadow: 'none!important'
                                    }}>
                                    <div className="w-fit flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                                        onClick={handleDownload}>
                                        <span className="select-all">Download (.{getValidExtension(extension)})</span>
                                        <Icon name='ArrowDownTray' className="size-6" />
                                    </div>
                                    <div className="w-fit flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                                        onClick={saveToLocalStorage}>
                                        <span className="select-all">Save</span>
                                        <Icon name='Bookmark' className="size-6" color={theme.textLight} />
                                    </div>
                                    <Copyable text={removeMarkdownCodeBlock(script)} />
                                </View>
                                <br />
                                <br />
                                <br />
                                <View className='card p-4 rounded-lg'>
                                    <Markdown content={script} />
                                </View>
                            </View>
                        )}
                    </Async>
                </View>
            )}
        </View>

    )
}

export default AIGenerator;