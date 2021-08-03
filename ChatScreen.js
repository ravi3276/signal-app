import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'

const ChatScreen = ({id ,chatName,enterChat}) => {
    return (
       <ListItem key={id} buttonDivider>
        <Avatar 
        rounded
        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png'}}/>

        <ListItem.Content>
            <ListItem.Title style={{fontWeight:"800"}}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {enterChat}
            </ListItem.Subtitle>
       </ListItem.Content>
       </ListItem>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})
