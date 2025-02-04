import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {DB_NAME, TABLES} from './constants';

// import {openDataBase} from './database';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

export const openDataBase = () => {
  return SQLite.openDatabase({name: DB_NAME, location: 'default'}, () => {
    console.log('Database connected');
    (error: any) => {
      console.log('database error', error);
    };
  });
};

export const createTable = async (db: SQLiteDatabase) => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${TABLES.PREFERENCE} (id TEXT PRIMARY KEY, category TEXT,  type TEXT)`,
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${TABLES.TRANSACTIONS} (id TEXT PRIMARY KEY , amount REAL, title TEXT, description TEXT, transactionType TEXT, category TEXT,categoryId TEXT)`,
    );
  });
};

export const insertData = async (
  tableName: string,
  data: Record<string, any>,
) => {
  const objectKeys = Object.keys(data).join(',');
  const values = Object.values(data);
  const placeHolders = Object.keys(data)
    .map(() => '?')
    .join(',');
  const db = openDataBase();
  (await db).transaction(tx => {
    tx.executeSql(
      `INSERT INTO ${tableName} (${objectKeys}) VALUES (${placeHolders})`,
      values,
      (_, result) => {
        console.log('result', result);
      },
      error => {
        console.log(`Error while inserting into ${tableName} `, error);
      },
    );
  });
};
