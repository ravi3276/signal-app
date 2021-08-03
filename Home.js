import { StatusBar } from 'expo-status-bar'
import React,{useLayoutEffect,useState,useEffect} from 'react'
import { SafeAreaView,ScrollView, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import ChatScreen from './ChatScreen'
import { auth,db } from './firebase';
import { AntDesign,SimpleLineIcons } from '@expo/vector-icons';


const Home = ({navigation}) => { 

    const enterChat=(id,chatName) => {
        navigation.navigate('Chat',{
            id,
            chatName
        })
    }

    const [chats,setChats]=useState([]);
    const signOut=()=>{
        auth.signOut().then(()=>{
            navigation.replace('Login');
        })
    }

    useEffect(() => {
        const unsubscribe=db.collection('chats').onSnapshot((snapshot)=>(
            setChats(snapshot.docs.map(doc=>({
                id: doc.id,
                data:doc.data()
            })))
        ));

        return unsubscribe;
    },[]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle:{backgroundColor:'white'},
            headerTitleStyle:{color:'black',alignSelf:'center'},
            headerTintColor:'black',
            headerLeft:()=> ( 
            <View style={{marginLeft:20}}>
                <TouchableOpacity 
                activeOpacity={0.5}
                onPress={signOut}
                >
                <Avatar rounded source={{uri:"https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}}/>
                </TouchableOpacity>
            </View>
            ),
            headerRight:()=>(
                <View style={{
                    flexDirection:"row",
                    alignItems: "center",
                    justifyContent:"space-between",
                    marginRight:20,
                }}> 
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={26} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.navigate('AddChat')} activeOpacity={0.5} style={{marginLeft:15}}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    return (
        <SafeAreaView>
            <StatusBar style="light"/>
           <ScrollView style={styles.container}>
               {
                   chats.map(({id,data:{chatName}})=>(
                        <ChatScreen
                        key={id}
                         id={id} 
                         chatName={chatName}
                         enterChat={enterChat}
                         />
                   ))
               }
               {/* <ChatScreen /> */}
           </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        height:"100%"
    }
})
