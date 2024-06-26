import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import HistoryCard from '../../components/historyCard/HistoryCard';
import {getData} from '../../utils/utils';
import {scale} from '../../constants';

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
      <ScrollView style={styles.scrollView}>
        <View style={{height: scale(30)}} />
        {savedHistory.map((item, index) => {
          return <HistoryCard key={index} data={item} />;
        })}
      </ScrollView>
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
});
