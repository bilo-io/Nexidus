import { useNavigate } from "react-router-dom";
import AppTopBar from "../../components/App/TopBar";

import { Async, Button, Icon, Text, View } from "../../components/Core";
import Accordion from "../../components/Core/Accordion/Accordion";
import { IScriptList } from "./generator";
import Markdown from "../../components/Core/Markdown/Markdown";
import Copyable from "../../components/Core/Copyable/Copyable";

type AIScriptsProps = object

export const AIScripts: React.FC<AIScriptsProps> = () => {
    const navigate = useNavigate();

    const scriptList: IScriptList[] = [
        {
            name: 'SQL Script 1',
            data: `
            SELECT * FROM users WHERE id = 1
            ORDER BY created_at DESC
            LIMIT 10
            `
        },
        {
            name: 'SQL Script 2',
            data: `
            SELECT * FROM users WHERE id = 1
            ORDER BY created_at DESC
            LIMIT 10
            `
        },
        {
            name: 'SQL Script 3',
            data: `
            SELECT * FROM users WHERE id = 1
            ORDER BY created_at DESC
            LIMIT 10
            `
        },
    ]
    return (
        <View isPage>
            <AppTopBar />

            <View className='pb-20' />

            <View isPageContent className='mx-auto max-w-3xl'>
                <Async loading={false} error={null}>
                    <Button onClick={() => navigate('/ai/generate')}>
                        <View flex flexRow items='center'>
                            <Icon name='Plus' className='size-6 mr-2' />
                            <Text color={'#FFF'}>Create new SQL script</Text>
                        </View>
                    </Button>

                    <br />

                    <View className='my-4 flex flex-row'>
                        <hr />
                        <Text>Or</Text>
                        <hr />
                    </View>

                    <View className='my-4'>
                        <Text>View a previously generates SQL script</Text>
                    </View>

                    <br />
                    {
                        scriptList.map((item: IScriptList) => (
                            <Accordion title={item.name}>
                                <View className='relative bg-white shadow-md rounded-lg p-4 mb-4'>
                                    <View className="absolute right-4 card">
                                        <Copyable text={item.data} />
                                    </View>
                                    <br />
                                    <View className='mt-4 card p-4 rounded-lg'>
                                        <Markdown content={item.data} />
                                    </View>
                                </View>
                            </Accordion>
                        ))
                    }

                </Async>
            </View>
        </View>
    )
}

export default AIScripts;