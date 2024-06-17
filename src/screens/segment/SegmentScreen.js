import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import FormData from 'form-data';
// import {scale} from '../../constants';
import {
  Canvas,
  CornerPathEffect,
  Image,
  useImage,
  Rect,
  Fill,
  Box,
  BoxShadow,
  rrect,
  rect,
  Paint,
  vec,
  Group,
  Text as RNSText,
  useFont,
} from '@shopify/react-native-skia';

const SegmentScreen = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);
  const canvasRef = useRef(null);
  const image = useImage(selectedImg);
  //const {width, height} = Dimensions.get('window');
  const [resizeW, setResizeW] = useState(null);
  const [resizeH, setResizeH] = useState(null);

  let file = {
    uri: '', // e.g. 'file:///path/to/file/image123.jpg'
    name: '', // e.g. 'image123.jpg',
    type: '', // e.g. 'image/jpg'
  };

  useEffect(() => {
    if (imgWidth && imgHeight) {
      if (imgHeight > 300) {
        setResizeH(300);
        const reW = resizeH * (imgWidth / imgHeight);
        setResizeW(reW);
      } else {
        setResizeH(imgHeight);
        const reW = resizeH * (imgWidth / imgHeight);
        setResizeW(reW);
      }
    }
  }, [imgWidth, imgHeight]);

  const openImagePicker = () => {
    const options = {
      savePhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        let base64Image = response.base64 | response.assets?.[0]?.base64;
        file.uri = imageUri;
        file.type = response.type || response.assets?.[0]?.type;
        file.name = response.fileName || response.assets?.[0]?.fileName;

        setSelectedImg(imageUri);
        setSelectedFile(response.assets?.[0]);

        console.log('uri', imageUri);
        console.log('img', response.assets?.[0]);
        console.log('file', selectedFile);
        setImgWidth(response.assets?.[0]?.width);
        setImgHeight(response.assets?.[0]?.height);
        console.log('w', response.assets?.[0]?.width);
        console.log('h', response.assets?.[0]?.height);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.text}>UPLOAD AN IMAGE</Text>
        <View style={styles.frame}>
          <Canvas style={styles.frame} ref={canvasRef}>
            <Image
              image={image}
              fit="cover"
              x={0}
              y={0}
              width={resizeW}
              height={resizeH}
            />
          </Canvas>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {}}
            style={[
              styles.button,
              {backgroundColor: 'rgba(227, 223, 205, 0.26)'},
            ]}>
            <Text style={[styles.label, {color: '#020843'}]}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openImagePicker()}
            style={[
              styles.button,
              {backgroundColor: 'rgba(227, 223, 205, 0.26)'},
            ]}>
            <Text style={[styles.label, {color: '#020843'}]}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={[styles.button, {backgroundColor: '#020843'}]}>
            <Text style={[styles.label, {color: '#ffff'}]}>Predict</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SegmentScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 10,
    color: '#020843',
  },
  bodyContainer: {
    width: '95%',
    height: 'auto',
  },
  frame: {
    width: '100%',
    height: 300,
    backgroundColor: '#020843',
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '30%',
    height: 45,
    opacity: '26%',
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
  },
});
