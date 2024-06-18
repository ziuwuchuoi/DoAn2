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
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import {useImage} from '@shopify/react-native-skia';
import {
  GestureHandlerRootView,
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

type ImageFile = {
  uri: string;
  name: string;
  type: string;
};

const SegmentScreen: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<Asset | null>(null);
  const [imgWidth, setImgWidth] = useState<number | null>(null);
  const [imgHeight, setImgHeight] = useState<number | null>(null);

  const image = useImage(selectedImg as string);
  const [resizeW, setResizeW] = useState<number | null>(null);
  const [resizeH, setResizeH] = useState<number | null>(null);

  const [start, setStart] = useState<{x: number; y: number} | null>(null);
  const [end, setEnd] = useState<{x: number; y: number} | null>(null);
  const [dimensions, setDimensions] = useState<{w: number; h: number} | null>(
    null,
  );

  const [isDrawing, setIsDrawing] = useState<boolean>(true);

  let file: ImageFile = {
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
    const options: ImageLibraryOptions = {
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

  const resetBox = () => {
    setStart(null);
    setEnd(null);
    setDimensions({w: 0, h: 0});
  };

  const handlePanGestureStart = (event: PanGestureHandlerGestureEvent) => {
    setStart({x: event.nativeEvent.x, y: event.nativeEvent.y});
    //setDimensions({w: 0, h: 0});
    setIsDrawing(true);
  };

  const handlePanGestureMove = (event: PanGestureHandlerGestureEvent) => {
    if (!selectedImg || !start) return;

    const {translationX, translationY} = event.nativeEvent;

    // Calculate new dimensions respecting image boundaries
    const newWidth = Math.max(0, Math.min(resizeW! - start.x, translationX));
    const newHeight = Math.max(0, Math.min(resizeH! - start.y, translationY));

    setEnd({x: start.x + newWidth, y: start.y + newHeight});
    setDimensions({w: newWidth, h: newHeight});
  };

  const handlePanGestureEnd = (event: HandlerStateChangeEvent) => {
    if (start) {
      setEnd({x: start.x + dimensions!.w, y: start.y + dimensions!.h});
    }
    console.log('w, h', dimensions?.w, dimensions?.h);
    setIsDrawing(false);
  };

  const renderAnnotations = () => {
    if (!selectedImg || !start || !end) return null;

    const boxTop = Math.min(start.y, end.y);
    const boxLeft = Math.min(start.x, end.x);
    const boxWidth = Math.abs(start.x - end.x);
    const boxHeight = Math.abs(start.y - end.y);

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

  console.log('top', start?.y);
  console.log('left', start?.x);
  console.log('endx', end?.x);
  console.log('endy', end?.y);
  console.log('w', dimensions?.w);
  console.log('h', dimensions?.h);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.text}>UPLOAD AN IMAGE</Text>
        <View style={styles.frame}>
          <GestureHandlerRootView style={{flex: 1}}>
            {selectedImg && resizeW && resizeH && (
              <PanGestureHandler
                onGestureEvent={handlePanGestureMove}
                onHandlerStateChange={handlePanGestureStart}
                onEnded={handlePanGestureEnd}>
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
              resetBox;
            }}
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
    //flex: 1,
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
    //marginTop: 400,
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
  },
});
