/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Navigator} from './navigator';
import {Provider} from 'react-redux';
import {store} from './redux/store/store';
import {openDataBase, createTable} from './database/database';
// import DeviceInfo from 'react-native-device-info';
// import { Navigator } from 'src/navigator/navigator';

const App = () => {
  useEffect(() => {
    const fetchAppId = async () => {
      // const device = await DeviceInfo;
      // const id = DeviceInfo.getBundleId();
      // console.log('bundle id...', device, id);
    };

    fetchAppId();
    async function fetchData() {
      const db = await openDataBase();
      createTable(db);
    }
    fetchData();
  }, []);
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
