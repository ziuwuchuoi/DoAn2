import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import HistoryCard from '../../components/historyCard/HistoryCard';
import {getData} from '../../utils/utils';
import {FONT_FAMILY, scale} from '../../constants';
import {useFocusEffect} from '@react-navigation/native';

const HistoryScreen = () => {
  const [savedHistory, setSavedHistory] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc'); // Default sorting order is descending

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

  const parseDateTime = (date, time) => {
    const [month, day, year] = date.split('/');
    const [hours, minutes, seconds] = time.split(':');
    return new Date(year, month - 1, day, hours, minutes, seconds);
  };

  const sortHistoryByDateTime = () => {
    const sortedHistory = [...savedHistory].sort((a, b) => {
      const dateTimeA = parseDateTime(a.date, a.time);
      const dateTimeB = parseDateTime(b.date, b.time);
      return sortOrder === 'desc'
        ? dateTimeB - dateTimeA
        : dateTimeA - dateTimeB;
    });
    setSavedHistory(sortedHistory);
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc'); // Toggle the sorting order
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={sortHistoryByDateTime}>
        <Text style={styles.buttonText}>
          Sort by Date & Time ({sortOrder === 'desc' ? 'Oldest' : 'Latest'})
        </Text>
      </TouchableOpacity>
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
  button: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#020843',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FONT_FAMILY.AbhayaMedium,
  },
  scrollView: {
    width: '100%',
    textAlign: 'justify',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  noHistoryText: {
    fontSize: 20,
    color: '#020843',
    fontFamily: FONT_FAMILY.AbhayaRegular,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
});
