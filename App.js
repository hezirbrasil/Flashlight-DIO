import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () =>{
  const [toggle, settoggle] = useState(false);

  const handleChangetoggle = ()=> settoggle(oldtoggle => !oldtoggle);

  useEffect(() => {
    //liga o flash do celular
    Torch.switchState(toggle);
  }, [toggle]);


  useEffect(() => {
    //quando o celular for chacoalhado mudamos o toggle
    const subscription = RNShake.addListener(()=>{
      settoggle(oldtoggle => !oldtoggle);
    });
    //quando essa função vai ser chamada quando o componente
    //for ser desmontado 
    return () => subscription.remove();
  }, []);

  return (  
    <View style={toggle ? style.containerLight : style.container}>
    <TouchableOpacity 
    onPress={handleChangetoggle}> 
      <Image
        style={toggle ? style.lightingOn : style.lightingOff}
        source={
          toggle
            ?require('./Assets/icons/eco-light.png')
            :require('./Assets/icons/eco-light-off.png')
        
        }
      />

      <Image
        style={toggle ? style.diologo : style.lightingOff}
        source={
          toggle
            ?require('./Assets/icons/logo-dio.png')
            :require('./Assets/icons/logo-dio-white.png')
        
        }
      />

    </TouchableOpacity>
    </View>
  );
};

export  default App;

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight:{
    flex:1,
    backgroundColor:'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lightingOn:{
    resizeMode:'contain',
    alignSelf:'center',
    width: 150,
    height: 150,
  },

  lightingOff:{
    resizeMode:'contain',
    alignSelf:'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },

  diologo:{
    resizeMode:'contain',
    alignSelf:'center',
    width: 250,
    height: 250,
  },
});