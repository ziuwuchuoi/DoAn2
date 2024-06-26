import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const HistoryCard = ({data}) => {
  const {cls, conf, date, id, time, url} = data;

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
        <Text style={styles.text}>{`ID: ${id}`}</Text>
        <Text style={styles.text}>{`Time: ${time}`}</Text>
        <Text style={styles.text}>{`Class: ${cls.join(', ')}`}</Text>
        <Text style={styles.text}>{`Confidence: ${conf.join(', ')}`}</Text>
      </View>
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#020843',
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
  },
  textContainer: {
    padding: 10,
    backgroundColor: 'pink',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});
