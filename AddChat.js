import React,{useLayoutEffect,useState} from 'react'
import { Button } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import {db} from './firebase';
const AddChat = ({navigation}) => {
    const [input, setInput] = useState("");

    const newChat=async ()=>{
        await db.collection('chats').add({
            chatName:input,
        }).then(()=>{navigation.goBack()})
        .catch((err)=>alert(err))
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new chat',
            headerBackTitle:'chats',

        })
    },[])
    return (
        <View style={styles.container}>
            <Input placeholder="Enter chat name" value={input} onChangeText={input=>setInput(input)}
            leftIcon={
                <Icon name="wechat" type="antdesign" size={24}/>
            }
            />

            <Button onPress={newChat} title="Create new chat"></Button>
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:30,
        height:"100%",
    }
})
