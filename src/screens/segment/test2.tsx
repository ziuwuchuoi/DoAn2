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
  const canvasRef = useRef(null);
  const image = useImage(selectedImg as string);
  const [resizeW, setResizeW] = useState<number | null>(null);
  const [resizeH, setResizeH] = useState<number | null>(null);
  const boxRef = useRef<View | null>(null);

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

  const [isBoxDrawing, setIsBoxDrawing] = useState<boolean>(false);
  const [initialX, setInitialX] = useState<number>(0);
  const [initialY, setInitialY] = useState<number>(0);

  const handlePanGestureStart = (event: PanGestureHandlerGestureEvent) => {
    if (!selectedImg) {
      return; // Handle case where image hasn't loaded yet
    }
    setIsBoxDrawing(true);
    setInitialX(event.nativeEvent.x);
    setInitialY(event.nativeEvent.y);
  };

  const handlePanGestureMove = (event: PanGestureHandlerGestureEvent) => {
    if (!isBoxDrawing) {
      return;
    }

    const {translationX, translationY} = event.nativeEvent;
    const currentX = initialX + translationX;
    const currentY = initialY + translationY;

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const imageAspectRatio = selectedImg ? screenWidth / screenHeight : 1;

    const maxWidth = screenWidth - currentX;
    const maxHeight = screenHeight - currentY;

    const boxWidth = Math.min(Math.max(currentX - initialX, 0), maxWidth);
    const boxHeight = Math.min(
      Math.max(currentY - initialY, 0),
      maxHeight / imageAspectRatio,
    );

    if (boxRef.current) {
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
    }
  };

  const handlePanGestureEnd = () => {
    setIsBoxDrawing(false);
  };

  console.log('selectImg', selectedImg);
  console.log('selectFile', selectedFile);

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
                  width={resizeW}
                  height={resizeH}
                  source={{uri: selectedImg}}
                  style={styles.image}
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
    marginTop: 400,
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
