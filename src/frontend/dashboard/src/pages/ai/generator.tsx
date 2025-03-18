import { useState } from "react";
import AppTopBar from "../../components/App/TopBar";

import { Async, Button, Dropdown, Icon, Input, Tabs, Text, View } from "../../components/Core";

type TransactionsProps = object

import { generate } from "../../utils/openai";
import { removeMarkdownCodeBlock } from "../../utils/markdown";
import Markdown from "../../components/Core/Markdown/Markdown";
import Copyable from "../../components/Core/Copyable/Copyable";
import { schemas } from "../../utils/schemas";
import { set } from "date-fns";
import { useTheme } from "../../context/ThemeContext";

export interface IScriptList {
    name: string;
    data: string;
}

export const AIGenerator: React.FC<TransactionsProps> = () => {
    const [clientId, setClientId] = useState<string>('')
    const [tables, setTables] = useState<string[]>([])
    const [script, setScript] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [numEntries, setNumEntries] = useState<number>(5)

    const { theme } = useTheme();

    const optionsDBTables = Object.keys(schemas).sort().map((table: string) => ({
        label: table,
        // @ts-ignore
        value: schemas[table]
    }))

    console.log(tables)

    const prompt = `
Create a postgres script inserting ${numEntries} into the tables: ${
        // @ts-ignore
        tables.map((item) => item.label).join(',')
        }.

The clientID is ${clientId}.

Schemas are:
${  // @ts-ignore
        tables.map((item) => schemas[item.label]).join('\n')
        }

please just respond with the raw sql
            `
    const handleGenerate = async () => {
        setLoading(true);

        // console.log({prompt})

        const response = await generate({
            fake: false,
            prompt
        })

        // console.log({ response })

        setLoading(false);
        // setScript(removeMarkdownCodeBlock(response as string))
        setScript(response as string)
    }

    return (
        <View isPage>
            <AppTopBar />

            <View className='pb-20' />

            <View isPageContent className="mx-auto max-w-3xl">
                <View flex flexCol>
                    <Text>1. Please enter a <code style={{ color: theme.primary }}>clientID</code> for which to generate data.</Text>
                    <Input value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        placeholder='Client ID'
                    />
                    <br />
                    <br />
                    <Text>2. Choose database tables to create a "seed" script for.</Text>
                    <Dropdown
                        options={optionsDBTables}
                        value={tables}
                        onChange={(e) => setTables(e)}
                        isMulti
                    />
                    <br />
                    <br />
                    <View className='flex flex-row items-center justify-between'>
                        <View>
                            <Text>3. How many entries do you want? &nbsp;&nbsp;</Text>
                            <Input
                                value={numEntries}
                                type={'number'}
                                className='w-12'
                                max={20}
                                onChange={(e) => setNumEntries(Number(e.target.value))}
                                placeholder='Client ID'
                            />
                        </View>

                        <Button className='w-fit' onClick={handleGenerate}>
                            <View className='flex flex-row'>
                                <Icon name={'Sparkles'} className="mr-4 size-6" />
                                <Text color={'#FFF'}>Generate SQL Script</Text>
                            </View>
                        </Button>
                    </View>
                    <br />

                </View>
                <br />
                <Async loading={loading} error={null}>
                    {script && (
                        <View className='relative w-full card px-4 mt-8'>

                            <View className='absolute right-4 card p-0'>
                                <Copyable text={removeMarkdownCodeBlock(script)} />
                            </View>
                            <br />
                            <br />
                            <View className='card p-4 rounded-lg'>
                                <Markdown content={script} />
                            </View>
                        </View>
                    )}
                </Async>
            </View>
        </View>
    )
}

export default AIGenerator;