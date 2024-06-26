import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import HistoryCard from '../../components/historyCard/HistoryCard';
import {getData} from '../../utils/utils';
import {FONT_FAMILY, scale} from '../../constants';

const HistoryScreen = () => {
  const [savedHistory, setSavedHistory] = useState([]);
  useEffect(() => {
    const loadHistory = async () => {
      const getHistory = await getData();
      console.log(getHistory);

      if (getHistory) {
        setSavedHistory(getHistory);
        console.log('set history successfully');
      } else {
        console.log('set history unsuccessfully');
      }
    };
    loadHistory();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {savedHistory.length === 0 ? (
        <Text style={styles.noHistoryText}>No history yet!</Text>
      ) : (
        <ScrollView style={styles.scrollView}>
          {savedHistory.map((item, index) => (
            <HistoryCard key={index} data={item} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollView: {
    width: '100%',
    textAlign: 'justify',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  noHistoryText: {
    fontSize: 20,
    color: 'black',
    fontFamily: FONT_FAMILY.AbhayaRegular,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
});
