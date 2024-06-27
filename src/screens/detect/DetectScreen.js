import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {scale} from '../../constants';
import {FONT_FAMILY} from '../../constants';
import {Chase, Wave} from 'react-native-animated-spinkit';

const DetectScreen = () => {
  const navigation = useNavigation();
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);
  const [resizeW, setResizeW] = useState(null);
  const [resizeH, setResizeH] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  let file = {
    uri: '',
    name: '',
    type: '',
  };

  useEffect(() => {
    if (imgWidth && imgHeight) {
      if (imgHeight > 300) {
        setResizeH(300);
        const reW = 300 * (imgWidth / imgHeight);
        setResizeW(reW);
      } else {
        setResizeH(imgHeight);
        const reW = imgHeight * (imgWidth / imgHeight);
        setResizeW(reW);
      }
    }
  }, [imgWidth, imgHeight]);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 3000,
      maxWidth: 3000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedAsset = response.assets[0];
        const imageUri = selectedAsset.uri;
        if (imageUri) {
          file.uri = imageUri;
          file.type = selectedAsset.type || '';
          file.name = selectedAsset.fileName || '';

          setSelectedImg(imageUri);
          setSelectedFile(selectedAsset);

          console.log('uri', imageUri);
          console.log('file', response.assets[0]);
          setImgWidth(selectedAsset.width || null);
          setImgHeight(selectedAsset.height || null);
          console.log('w', selectedAsset.width);
          console.log('h', selectedAsset.height);
        }
      }
    });
  };

  async function handleSubmit() {
    if (selectedFile !== null) {
      setIsLoad(true);
      let data = new FormData();
      console.log('img', selectedFile);

      data.append('image', {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: selectedFile.fileName,
      });

      console.log('data', data);

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://zichuoi-segmedda2.hf.space/detect',
        headers: {'Content-Type': 'multipart/form-data'},
        data: data,
      };

      await axios(config)
        .then(response => {
          console.log('Upload successful');
          setIsLoad(false);
          setSelectedImg(null);
          navigation.navigate('Predict', {
            imageData: response.data,
            imageHeight: resizeH,
            imageWidth: resizeW,
          });
        })

        .catch(error => {
          console.log(error);
        });
    } else {
      console.error('No file selected');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.text}>Upload an image to predict</Text>
        <View style={styles.frame}>
          {selectedImg && (
            <Image
              width={resizeW}
              height={resizeH}
              source={{uri: selectedImg}}
              style={styles.image}
            />
          )}
        </View>
        {!isLoad ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={openImagePicker}
              style={[
                styles.button,
                {backgroundColor: 'rgba(227, 223, 205, 0.26)'},
              ]}>
              <Text style={[styles.label, {color: '#020843'}]}>UPLOAD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
              style={[styles.button, {backgroundColor: '#020843'}]}>
              <Text style={[styles.label, {color: '#ffff'}]}>PREDICT</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Wave size={48} color="#020843"></Wave>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DetectScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: scale(25),
    alignSelf: 'center',
    marginBottom: 10,
    color: '#020843',
    fontFamily: FONT_FAMILY.AbhayaSemiBold,
  },
  bodyContainer: {
    width: '95%',
    height: 'auto',
    marginTop: scale(50),
  },
  frame: {
    width: '100%',
    height: 300,
    borderRadius: 25,
    marginBottom: 50,
    alignItems: 'center',
    backgroundColor: '#020843',
    justifyContent: 'center',
  },
  canvas: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    marginBottom: 20,
    zIndex: 10000,
  },
  image: {
    resizeMode: 'contain',
  },
  boundingBox: {
    position: 'absolute',
    borderRadius: 4,
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '35%',
    height: 50,
    borderRadius: 30,
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#171717',
  },
  label: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.AbhayaMedium,
  },
});
