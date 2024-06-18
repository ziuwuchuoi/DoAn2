//code cu
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import FormData from 'form-data';

import {useImage} from '@shopify/react-native-skia';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Canvas from 'react-native-canvas';

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
      maxHeight: 3000,
      maxWidth: 3000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
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

  //
  const [imageUri, setImageUri] = useState(''); // Replace with your image URI
  const [isBoxDrawing, setIsBoxDrawing] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const boxRef = useRef(null); // Ref for the bounding box View

  const handleImageLoad = event => {
    const {width, height} = event.nativeEvent.layout;

    setImageUri(selectedImg); // Replace with your actual image path
  };

  const handlePanGestureStart = event => {
    if (!imageUri) {
      return; // Handle case where image hasn't loaded yet
    }
    setIsBoxDrawing(true);
    setInitialX(event.nativeEvent.x);
    setInitialY(event.nativeEvent.y);
  };

  const handlePanGestureMove = event => {
    if (!isBoxDrawing) {
      return;
    }

    const {translationX, translationY} = event.nativeEvent;
    const currentX = initialX + translationX;
    const currentY = initialY + translationY;

    // Ensure box stays within image bounds
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const imageAspectRatio = imageUri
      ? event.nativeEvent.layout.width / event.nativeEvent.layout.height
      : 1; // Handle case where image hasn't loaded yet
    const maxWidth = screenWidth - currentX;
    const maxHeight = screenHeight - currentY;

    const boxWidth = Math.min(Math.max(currentX - initialX, 0), maxWidth);
    const boxHeight = Math.min(
      Math.max(currentY - initialY, 0),
      maxHeight / imageAspectRatio,
    );

    boxRef.current.setNativeProps({
      style: {
        top: currentY - boxHeight,
        left: currentX,
        width: boxWidth,
        height: boxHeight,
        borderWidth: 2,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
      },
    });
  };

  const handlePanGestureEnd = () => {
    setIsBoxDrawing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.text}>UPLOAD AN IMAGE</Text>
        <GestureHandlerRootView style={{flex: 1}}>
          <View style={styles.frame}>
            {selectedImg && (
              <PanGestureHandler
                onGestureEvent={handlePanGestureMove}
                onHandlerStateChange={handlePanGestureStart}
                onEnded={handlePanGestureEnd}>
                <Image
                  source={selectedImg}
                  style={styles.image}
                  onLoad={handleImageLoad}
                />
              </PanGestureHandler>
            )}
          </View>

          {isBoxDrawing && <View ref={boxRef} style={styles.boundingBox} />}
        </GestureHandlerRootView>
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
            onPress={openImagePicker}
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
    alignItems: 'center',
  },
  canvas: {
    width: '100%',
    height: '100%',
    //backgroundColor: 'yellow',
    borderRadius: 25,
    marginBottom: 20,
    zIndex: 10000,
    //position: 'absolute',
  },
  image: {
    flex: 1,
    resizeMode: 'contain', // Adjust resize mode as needed
  },
  boundingBox: {
    position: 'absolute',
    borderRadius: 4, // Optional for rounded corners
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '100',
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
