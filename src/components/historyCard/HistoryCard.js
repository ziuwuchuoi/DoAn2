import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {FONT_FAMILY} from '../../constants';

const HistoryCard = ({data}) => {
  const {cls, conf, date, id, time, url} = data;
  const clsText = cls
    .map(item => (item === 0 ? 'negative' : 'positive'))
    .join(', ');
  const confText = conf.map(item => item.toFixed(3)).join(', ');

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          width={200}
          height={200}
          style={styles.image}
          source={{uri: url}}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{`Date: ${date}`}</Text>
        <Text style={styles.text}>{`Time: ${time}`}</Text>
        <Text style={styles.text}>{`Class: ${clsText}`}</Text>
        <Text style={styles.text}>{`Confidence: ${confText}`}</Text>
      </View>
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020843',
  },
  textContainer: {
    padding: 10,
    backgroundColor: 'rgba(227, 223, 205, 0.26)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    fontSize: 20,
    marginBottom: 5,
    color: '#020843',
    fontFamily: FONT_FAMILY.AbhayaRegular,
  },
});
