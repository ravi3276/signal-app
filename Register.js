import { StatusBar } from 'expo-status-bar'
import React,{useState,useLayoutEffect} from 'react'
import { StyleSheet, View ,KeyboardAvoidingView} from 'react-native'
import {Input,Button,Text} from 'react-native-elements';
import {db,auth} from './firebase';
const Register = ({navigation}) => {

    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [imgUrl,setImgUrl]=useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"Back to Login"
        })
    },[navigation]);

    const register=()=>{
            auth.createUserWithEmailAndPassword(email,password)
            .then(authUser => {
                console.log(authUser)
                authUser.user.updateProfile({
                    displayName:name,
                    photoURL:imgUrl || "https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",

                })
            }).catch(err => alert(err));
    }
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light'/>
            <Text h3 style={{marginBottom:50}}>
                create a signal account
            </Text>

            <View style={styles.inputcontainer}>
                <Input autofocus type="text" placeholder="Full Name" value={name} onChangeText={name=>setName(name)}/>
           
                <Input autofocus type="text" placeholder="Email" value={email} onChangeText={email=>setEmail(email)}/>


                <Input autofocus type="text" placeholder="Password" secureTextEntry value={password} onChangeText={password=>setPassword(password)} />


                <Input autofocus type="text" placeholder="Profile Picture (optional)" value={imgUrl} onChangeText={imgUrl=>setImgUrl(imgUrl)}/>


                {/* <Input autofocus type="text" placeholder="" value={} onChangeText={}/> */}
            </View>

            <Button containerStyle={styles.button} raised title="Submit" onPress={register}></Button>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
    },
    inputcontainer:{
        width:300,
    },
    button:{
        width:200,
        marginTop:10,
    }
})
