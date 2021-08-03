import React, { useLayoutEffect,useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import {AntDesign,FontAwesome,Ionicons} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { db ,auth} from './firebase';
import firebase from 'firebase';
const Chat = ({navigation,route}) => {
    const [input, setInput] = useState("");
    const [msg, setMsg] = useState([]);


    const sendMSG=() => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('message').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName:auth.currentUser.displayName,
            email: auth.currentUser.email,
            // photoURL: auth.currentUser.photoUrl,
        })
        setInput("");
    };
    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('message')
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot) => setMsg(snapshot.docs.map(doc=>({
            id:doc.id,
            data:doc.data(),
        }))))

        return unsubscribe;
    },[route])
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            // headerTitleStyle:{color: 'red'},
            headerBackTitleVisible: false,
            headerTitle:()=> (
            <View style={{flexDirection:'row',alignItems: 'center'}}>
                    <Avatar rounded
                    source={{
                        uri:"https://spng.pngfind.com/pngs/s/5-52097_avatar-png-pic-vector-avatar-icon-png-transparent.png"
                    }}
                    />
                <Text style={{color: 'white',marginLeft:10,fontWeight:"800",fontSize:20}}>
                {route.params.chatName}
                </Text>
            </View>
            ),
            headerLeft: () => (
                <TouchableOpacity 
                activeOpacity={0.5} onPress={navigation.goBack}
                style={{marginLeft:20}}
                >
                    <AntDesign name="arrowleft" size={24} color="white"/>
                </TouchableOpacity>
            ),

            headerRight: () => (
                <View
                style={{
                    flexDirection:'row',
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                    marginRight:20,
                    width:80
                }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white"/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <FontAwesome name="phone" size={24} color="white"  />
                    </TouchableOpacity>
                </View>
            )

        })
    }, [navigation])
    return (
        <SafeAreaView  style={{flex:1,backgroundColor:'white'}}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding':'height'}
            style={styles.container}
            keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
                <ScrollView style={{paddingTop:15}}>
                    {
                        msg.map(({id,data})=>(
                            data.email === auth.currentUser.email ?(
                                <View key={id} style={styles.reciver}>
                                    <Avatar
                                    containerStyle={{
                                        position:"absolute",
                                        bottom:-15,
                                        right: -5 
                                    }}
                                    position="absolute"
                                    bottom={-15}
                                    right={-5}
                                     rounded size={30} source={{uri:"https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}}/>
                                    <Text>{data.message}</Text>
                                </View>
                            ):(
                            <View key={id} style={styles.sender}>
                            <Avatar 
                            containerStyle={{
                                position:"absolute",
                                bottom:-15,
                                right: -5 
                            }}
                            position="absolute"
                            bottom={-15}
                            left={-5}
                            rounded
                            source={{uri:"https://spng.pngfind.com/pngs/s/5-52097_avatar-png-pic-vector-avatar-icon-png-transparent.png"}}
                            />
                            <Text style={styles.msg}>{data.message}</Text>
                            <Text style={styles.displayname}>{data.displayName}</Text>

                            </View>
                            )
                        ))
                    }
                 </ScrollView>

                <View style={styles.footer}>
                    <TextInput
                    onChangeText={input=>setInput(input)}
                    value={input}
                     placeholder="Signal Message" 
                     style={styles.textInput}
                     />

                     <TouchableOpacity activeOpacity={0.5} onPress={sendMSG}>
                        <Ionicons name="send" size={24} color="#2B68E6"/>
                     </TouchableOpacity>
                    </View>
                   
            </>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Chat

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    footer:{
        flexDirection:'row',
        alignItems: 'center',
        padding:15,
        width:"100%",
    },
    textInput:{
        flex:1,
        backgroundColor:'lightgrey',
        borderRadius:30,
        padding:6,
        marginRight:15,
        bottom:0,
        color: 'black',
        borderWidth:1,
        borderColor: 'transparent',
        height:40
    },
    reciver:{
        padding:20,
        backgroundColor:'#ECECEC',
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:10,
        marginBottom:15,
        maxWidth:"80%",
        position:'relative'
    },
    sender:{
        padding:20,
        backgroundColor:'#2B68E6',
        alignSelf:'flex-start',
        borderRadius:20,
        margin:15,
        maxWidth:"80%",
        position:'relative'
    },
    msg:{
        color:'#FFFFFF',
        fontWeight:"500",
        marginLeft:10,
        marginBottom:15,
    },
    displayname:{
        left:10,
        color:'white',
        paddingRight:10,
        fontSize:10
    }
})
