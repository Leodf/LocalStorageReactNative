import SQLiteConnection from './Sqlite';

export async function createTable() {
  const db = await SQLiteConnection();
  db.transaction((transaction: any) => {
    transaction.executeSql(
      'CREATE TABLE IF NOT EXISTS Notas (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);',
    );
  });
}

export async function clearTable() {
  const db = await SQLiteConnection();
  db.transaction((transaction: any) => {
    transaction.executeSql('DELETE FROM Notas');
  });
}

export async function addNote(note: any) {
  const db = await SQLiteConnection();
  return new Promise(resolve => {
    db.transaction((transaction: any) => {
      transaction.executeSql(
        'INSERT INTO Notas (titulo, categoria, texto) VALUES (?, ?, ?);',
        [note.titulo, note.categoria, note.texto],
        () => {
          resolve('Nota adicionada com sucesso!');
        },
      );
    });
  });
}

export async function listNotes() {
  const db = await SQLiteConnection();
  return new Promise(resolve => {
    db.transaction((transaction: any) => {
      transaction.executeSql(
        'SELECT * FROM Notas;',
        [],
        (_: any, result: any) => {
          resolve(result.rows.raw());
        },
      );
    });
  });
}

export async function updateNote(note: any) {
  const db = await SQLiteConnection();
  return new Promise(resolve => {
    db.transaction((transaction: any) => {
      transaction.executeSql(
        'UPDATE Notas SET titulo=?, categoria=?, texto=? WHERE id = ?;',
        [note.titulo, note.categoria, note.texto, note.id],
        () => {
          resolve('Nota atualizada com sucesso!');
        },
      );
    });
  });
}

export async function deleteNote(note: any) {
  const db = await SQLiteConnection();
  return new Promise(resolve => {
    db.transaction((transaction: any) => {
      transaction.executeSql(
        'DELETE FROM Notas WHERE id = ?;',
        [note.id],
        () => {
          resolve('Nota removida com sucesso!');
        },
      );
    });
  });
}

export async function filtraPorCategoria(categoria: any) {
  const db = await SQLiteConnection();
  return new Promise(resolve => {
    db.transaction((transaction: any) => {
      transaction.executeSql(
        'SELECT * FROM Notas WHERE categoria = ?;',
        [categoria],
        (_: any, result: any) => {
          resolve(result.rows.raw());
        },
      );
    });
  });
}
