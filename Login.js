import { StatusBar } from 'expo-status-bar'
import React,{useState,useEffect} from 'react'
import {StyleSheet, Text, View,KeyboardAvoidingView } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {auth} from './firebase';


const Login = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    // console.log(email)

   useEffect(() => {
     const unsubscribe =auth.onAuthStateChanged((authUser)=>{
        //  console.log(authUser)
          if (authUser){
              navigation.replace('Home')
          }  
      })
 
      return unsubscribe;
   }, [])

    const signIn=()=>{
            auth.signInWithEmailAndPassword(email,password)
            .catch(err =>alert(err))
    }

    return (
        <KeyboardAvoidingView  style={styles.container}>
            <StatusBar style="light"/>
           <Image source={{
               uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png"
           }}
           style={{width:200, height:200,borderRadius:10}}
           />
           <View style={styles.inputContainer}>
            <Input autofocus placeholder="Enter your Email" type="email" value={email} onChangeText={email=>setEmail(email)} />
            <Input placeholder="Enter your Password" secureTextEntry type="password" value={password} onChangeText={password=>setPassword(password)}/>
           </View>

           <Button containerStyle={styles.button} title="Login" onPress={signIn}></Button>
           <Button containerStyle={styles.button} type='outline' onPress={() => navigation.navigate('Register')} title="Register"></Button>
           {/* <View style={{height:100}}></View> */}
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
      },
      inputContainer:{
        width:300,
        paddingTop:10,
      },
      button:{
          width:200, 
          marginTop:10,
      }
})
