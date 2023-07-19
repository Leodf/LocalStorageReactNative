import SQLite from 'react-native-sqlite-storage';

const SQLiteConnection = async () => {
  const database = SQLite.openDatabase(
    {
      name: 'test.db',
      location: 'default',
      createFromLocation: '~www/test.db',
    },
    () => {
      Promise.resolve();
    },
    error => {
      console.error('Erro ao abrir o banco de dados:', error);
      Promise.reject(error);
    },
  );
  return database;
};

export default SQLiteConnection;
