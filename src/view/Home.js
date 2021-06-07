import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  ScrollView,
  Alert,
  TouchableHighlight,
  TextInput,
} from 'react-native';

import axios from 'axios';
const Home = () => {
  useEffect(() => {
    getPost();
  }, []);
  const [post, setPost] = useState(null);
  const [isFrm, setIsFrm] = useState(false);
  const [frmValues, setFrmValues] = useState({});
  const getPost = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
      setPost(res.data.slice(0, 10));
    });
  };

  const handleValues = ({prop, value}) => {
    setFrmValues({...frmValues, [prop]: value});
  };

  const savePost = () => {
    frmValues.id = 1;
    axios.post('https://jsonplaceholder.typicode.com/posts', frmValues).then(res => {
        Alert.alert('El post se guardo correctamente')
        setIsFrm(false)
        getPost()
    });
  };

  const deletePost = id => {
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => {
        Alert.alert('El post se elimino correctamente')
      })
  }

  const FrmSave = () => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{margin: 20}}>
          <TextInput
            placeholder="Titulo"
            style={{width: 350, height: 50, backgroundColor: 'white'}}
            onChange={text => handleValues({prop: 'title', value: text})}
          />
        </View>
        <View style={{margin: 20}}>
          <TextInput
            placeholder="Cuerpo"
            style={{width: 350, height: 50, backgroundColor: 'white'}}
            onChange={text => handleValues({prop: 'body', value: text})}
          />
        </View>
        <View>
          <TouchableHighlight
            style={{
              backgroundColor: 'blue',
              color: 'white',
              width: 350,
              height: 65,
              alignContent: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              padding: 10,
              marginLeft: 20,
              marginTop: 20
              
            }}
            onPress={savePost}
            >
            <Text style={{textAlign: 'center'}}>Guardar</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              backgroundColor: 'red',
              color: 'white',
              width: 350,
              height: 65,
              alignContent: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              padding: 10,
              marginLeft: 20,
              marginTop: 20

              
            }}
            onPress={() => {
                setIsFrm(false)
            }}
            >
            <Text style={{textAlign: 'center'}}>Cancelar</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  const renderCustomItem = ({item, index}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 2,
          borderBottomColor: '#23282e',
        }}
        key={index}>
        <Text
          style={{
            color: '#000000',
            textAlign: 'justify',
            fontWeight: 'bold',
            margin: 10,
            padding: 2,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            color: '#000000',
            textAlign: 'justify',
            margin: 10,
            padding: 2,
          }}>
          {item.body}
        </Text>
        <TouchableHighlight
          style={{
            backgroundColor: 'red',
            color: 'white',
            width: 350,
            height: 40,
            alignContent: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            padding: 10,
            marginLeft: 20,
          }}
          onPress={() => {
            Alert.alert('Confirmación', '¿Desaeas continuar?', [
              {
                text: 'Si',
                onPress: () => deletePost(item.id),
              },
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ]);
          }}>
          <Text style={{textAlign: 'center'}}>Eliminar</Text>
        </TouchableHighlight>
      </View>
    );
  };

  const keyExtractor = (item, index) => index;

  return (
    <ScrollView style={{height: 800}}>
      {!isFrm && (
        <TouchableHighlight
          style={{
            backgroundColor: '#845EC2',
            color: 'white',
            width: 350,
            height: 40,
            alignContent: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            padding: 10,
            marginLeft: 20,
            marginTop: 20,
            marginBottom: 30,
          }}
          onPress={() => {
            setIsFrm(true);
          }}>
          <Text style={{textAlign: 'center'}}>Crear nuevo post</Text>
        </TouchableHighlight>
      )}
      {!isFrm && post && (
        <FlatList
          data={post}
          renderItem={renderCustomItem}
          style={{width: 350}}
          keyExtractor={keyExtractor}
        />
      )}
      {isFrm && FrmSave()}
    </ScrollView>
  );
};

export default Home;
