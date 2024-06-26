import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React from 'react';
import {FONT_FAMILY, scale} from '../../constants';
import {useState, useEffect} from 'react';
import Share from 'react-native-share';
import * as RNFS from '@dr.pogodin/react-native-fs';
import {storeData} from '../../utils/utils';

const PredictScreen = ({route}) => {
  const {imageData, imageWidth, imageHeight} = route.params;
  const [image, setImage] = useState(null);
  const cls = imageData[1];
  const conf = imageData[2];

  useEffect(() => {
    if (imageData) {
      const imgSrc = `data:image/jpeg;base64,${imageData[0]}`;
      setImage(imgSrc);
    }
  }, [imageData]);

  useEffect(() => {
    if (image) {
      const randomId = generateRandomId();
      console.log(randomId);
      console.log(image);
      const dataToStorage = {
        id: randomId,
        time: getCurrentTime(),
        date: getCurrentDate(),
        url: image,
        cls: cls,
        conf: conf,
      };
      storeData(dataToStorage);
    }
  }, [image]);

  async function handleShare() {
    try {
      const shareOptions = {
        title: 'BrainTumor',
        url: image,
        message: 'This is your prediction!',
      };
      const shareResponse = await Share.open(shareOptions);
      console.log(shareResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Download this to storage!',
          message: 'To save image to your device.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Downloaded!');
        downloadImage();
      } else {
        console.log('Download permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const generateRandomId = () => {
    return (
      'id-' +
      Math.random().toString(36).substr(2, 9) +
      '-' +
      Date.now().toString(36)
    );
  };

  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  };
  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  function generateImageName() {
    const now = new Date();

    // Get date components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(now.getDate()).padStart(2, '0');

    // Get time components
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Construct the timestamp string
    const timestamp = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
    return timestamp;
  }

  const downloadImage = async () => {
    const base64Image = imageData; // Base64 image data
    const imgFix = generateImageName();
    const downloadDest = `${RNFS.PicturesDirectoryPath}/${imgFix}-image.jpg`;
    console.log('dest', downloadDest);

    try {
      await RNFS.writeFile(downloadDest, base64Image, 'base64');
      console.log('Image downloaded to:', downloadDest);
      Alert.alert('Download Complete', 'Image saved to your device');
    } catch (error) {
      console.error('Error downloading image:', error);
      Alert.alert('Download Failed', 'Failed to save image');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.text}>Here is your prediction!</Text>
        <View style={styles.frame}>
          {image && (
            <Image
              width={imageWidth}
              height={imageHeight}
              source={{uri: image}}
              style={styles.image}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleShare}
            style={[
              styles.button,
              {backgroundColor: 'rgba(227, 223, 205, 0.26)'},
            ]}>
            <Text style={[styles.label, {color: '#020843'}]}>SHARE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={checkPermission}
            style={[styles.button, {backgroundColor: '#020843'}]}>
            <Text style={[styles.label, {color: '#ffff'}]}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PredictScreen;

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
    backgroundColor: '#020843',
    borderRadius: 25,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    position: 'absolute',
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
