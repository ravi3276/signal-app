import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { db } from './firebase';

const ChatScreen = ({id ,chatName,enterChat}) => {
    const [msg,setMsg]= useState([]);

    useEffect(() => {
       const unsubscribe =db.collection('chats').doc(id).collection('message').orderBy('timestamp','desc')
        .onSnapshot(snapshot => (setMsg(snapshot.docs.map(doc=>doc.data()))))

        return unsubscribe;
    },[])
    return (
       <ListItem onPress={()=>enterChat(id,chatName)} key={id} bottomDivider>
        <Avatar 
        rounded
        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png'}}/>

        <ListItem.Content>
            <ListItem.Title style={{fontWeight:"800"}}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {
                        msg?.[0]?.displayName
                    }: {msg[0].message}
            </ListItem.Subtitle>
       </ListItem.Content>
       </ListItem>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})
