import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async newData => {
  try {
    const existingData = await getData();
    const updatedData = existingData ? [...existingData, newData] : [newData];
    const jsonValue = JSON.stringify(updatedData);
    await AsyncStorage.setItem('historydata', jsonValue);
    console.log('Data stored successfully');
  } catch (e) {
    console.error('Failed to store data', e);
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('historydata');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch data', e);
    return [];
  }
};
