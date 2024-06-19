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
import {useImage} from '@shopify/react-native-skia';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {scale} from '../../constants';
import {FONT_FAMILY} from '../../constants';

const SegmentScreen = () => {
  const navigation = useNavigation();
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);

  const image = useImage(selectedImg);
  const [resizeW, setResizeW] = useState(null);
  const [resizeH, setResizeH] = useState(null);

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [dimensions, setDimensions] = useState(null);
  const [newStart, setNewStart] = useState(null);

  const [isDrawing, setIsDrawing] = useState(true);
  const [annotations, setAnnotations] = useState([]);

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
      let data = new FormData();
      console.log('img', selectedFile);
      console.log('bb', annotations[0]);

      data.append('image', {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: selectedFile.fileName,
      });
      //cai nay de nguyen cai arr anno luon :)
      data.append('boundingbox', annotations[0]);
      console.log('data', data);

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://zichuoi-segmedda2.hf.space/test',
        headers: {'Content-Type': 'multipart/form-data'},
        data: data,
      };

      await axios(config)
        .then(response => {
          console.log('Upload successful');
          console.log('length', response.data.length);
          navigation.navigate('Result', {
            image: selectedFile,
            matrics: response.data,
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.error('No file selected');
    }
  }

  const resetBox = () => {
    setStart(null);
    setNewStart(null);
    setEnd(null);
    setDimensions(null);
    setAnnotations([]);
  };

  const handlePanGestureStateChange = event => {
    if (!selectedImg) return;

    if (!start) {
      const {x, y} = event.nativeEvent;
      const newStart = {x, y};
      setStart(newStart);
      setIsDrawing(true);
    }
  };

  const handlePanGestureEvent = event => {
    if (!selectedImg || !start) return;

    const {translationX, translationY} = event.nativeEvent;

    const newWidth = Math.max(0, Math.min(resizeW - start.x, translationX));
    const newHeight = Math.max(0, Math.min(resizeH - start.y, translationY));

    setDimensions({w: newWidth, h: newHeight});
    setEnd({x: start.x + newWidth, y: start.y + newHeight});
    if (end) {
      setNewStart({
        x: Math.abs(end.x - newWidth),
        y: Math.abs(end.y - newHeight),
      });
    }
  };

  useEffect(() => {
    if (start && dimensions) {
      const annotation = [start.x, start.y, dimensions.w, dimensions.h];
      setAnnotations([annotation]);
    }
  }, [start, dimensions]);

  const renderAnnotations = () => {
    if (!selectedImg || !start || !end || !newStart) return null;

    const boxTop = Math.min(newStart.y, end.y);
    const boxLeft = Math.min(newStart.x, end.x);
    const boxWidth = Math.abs(newStart.x - end.x);
    const boxHeight = Math.abs(newStart.y - end.y);

    return (
      <View
        style={{
          position: 'absolute',
          top: boxTop,
          left: boxLeft,
          width: boxWidth,
          height: boxHeight,
          borderWidth: 2,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.3)',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.text}>UPLOAD AN IMAGE</Text>
        <View style={styles.frame}>
          <GestureHandlerRootView style={{flex: 1}}>
            {selectedImg && resizeW && resizeH && (
              <PanGestureHandler
                onGestureEvent={handlePanGestureEvent}
                onHandlerStateChange={handlePanGestureStateChange}>
                <View>
                  <Image
                    width={resizeW}
                    height={resizeH}
                    source={{uri: selectedImg}}
                    style={styles.image}
                  />
                  {isDrawing && start && dimensions && (
                    <View
                      style={{
                        position: 'absolute',
                        backgroundColor: 'rgba(0, 0, 255, 0.3)',
                        top: start.y,
                        left: start.x,
                        width: dimensions.w,
                        height: dimensions.h,
                        borderWidth: 2,
                        borderColor: 'blue',
                      }}
                    />
                  )}
                  {!isDrawing && renderAnnotations()}
                </View>
              </PanGestureHandler>
            )}
          </GestureHandlerRootView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              resetBox();
            }}
            style={[
              styles.button,
              {backgroundColor: 'rgba(227, 223, 205, 0.26)'},
            ]}>
            <Text style={[styles.label, {color: '#020843'}]}>RESET</Text>
          </TouchableOpacity>
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
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#020843',
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
    width: '30%',
    height: 45,
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
