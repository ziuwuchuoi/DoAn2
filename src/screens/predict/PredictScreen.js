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

const PredictScreen = ({route}) => {
  const {imageData, imageWidth, imageHeight} = route.params;
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (imageData) {
      const imgSrc = `data:image/jpeg;base64,${imageData}`;
      setImage(imgSrc);
    }
  }, [imageData]);

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

  const downloadImage = async () => {
    const base64Image = imageData; // Base64 image data
    const downloadDest = `${RNFS.DownloadDirectoryPath}/image.jpg`;
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
        <Text style={styles.text}>PREDICTION</Text>
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
    marginBottom: 20,
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
