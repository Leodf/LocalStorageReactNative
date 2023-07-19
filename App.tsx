import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import NotaEditor from './src/components/NotaEditor';
import React, {useEffect, useState} from 'react';
import {Nota} from './src/components/Nota';
import {createTable, filtraPorCategoria, listNotes} from './src/services/Notas';
import {Picker} from '@react-native-picker/picker';

export default function App() {
  useEffect(() => {
    createTable();
    mostraNotas();
  }, []);

  const [selectedNote, setSelectedNote] = useState({});
  const [notas, setNotas] = useState([]);
  const [categoria, setCategoria] = useState('Todos');

  async function mostraNotas() {
    const allNotes = (await listNotes()) as any;
    setNotas(allNotes);
  }
  async function filtraLista(categoriaSelecionada: any) {
    setCategoria(categoriaSelecionada);
    if (categoriaSelecionada === 'Todos') {
      mostraNotas();
    } else {
      const notes = (await filtraPorCategoria(categoriaSelecionada)) as any;
      setNotas(notes);
    }
  }

  function filterRender() {
    return (
      <View style={estilos.picker}>
        <Picker
          selectedValue={categoria}
          onValueChange={categoriaSelecionada =>
            filtraLista(categoriaSelecionada)
          }>
          <Picker.Item label="Todos" value="Todos" />
          <Picker.Item label="Pessoal" value="Pessoal" />
          <Picker.Item label="Trabalho" value="Trabalho" />
          <Picker.Item label="Outros" value="Outros" />
        </Picker>
      </View>
    );
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={nota => (
          <Nota {...nota} setSelectedNote={setSelectedNote} />
        )}
        keyExtractor={(nota: any) => nota.id}
        ListHeaderComponent={filterRender}
      />
      <NotaEditor
        mostraNotas={mostraNotas}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
      <StatusBar />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#EEEEEE',
    margin: 16,
  },
});
