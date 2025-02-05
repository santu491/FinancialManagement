import moment from 'moment';
import {Platform} from 'react-native';

export const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const isIOS = () => Platform.OS === 'ios';

export const dateFormate = (date: Date) => moment(date).format('DD/MM/YYYY');
