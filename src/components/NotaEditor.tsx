import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {addNote, deleteNote, updateNote} from '../services/Notas';

export default function NotaEditor({
  mostraNotas,
  selectedNote,
  setSelectedNote,
}) {
  useEffect(() => {
    if (selectedNote.id) {
      preencheModal();
      setNoteToUpdate(true);
      setModalVisivel(true);
      return;
    }
    return setNoteToUpdate(false);
  }, [selectedNote]);

  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('Pessoal');
  const [texto, setTexto] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [noteToUpdate, setNoteToUpdate] = useState(false);

  async function salvaNota() {
    const oneNote = {
      titulo,
      categoria,
      texto,
    };
    await addNote(oneNote);
    mostraNotas();
    setModalVisivel(false);
    limpaModal();
  }

  async function modificaNota() {
    const oneNote = {
      titulo,
      categoria,
      texto,
      id: selectedNote.id,
    };
    await updateNote(oneNote);
    mostraNotas();
    setModalVisivel(false);
    limpaModal();
  }

  async function removeNota() {
    await deleteNote(selectedNote);
    mostraNotas();
    limpaModal();
  }

  function preencheModal() {
    setTitulo(selectedNote.titulo);
    setCategoria(selectedNote.categoria);
    setTexto(selectedNote.texto);
  }

  function limpaModal() {
    setTitulo('');
    setCategoria('Pessoal');
    setTexto('');
    setSelectedNote({});
    setModalVisivel(false);
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {
          setModalVisivel(false);
        }}>
        <View style={estilos.centralizaModal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={estilos.modal}>
              <Text style={estilos.modalTitulo}>Criar nota</Text>
              <Text style={estilos.modalSubTitulo}>Título da nota</Text>
              <TextInput
                style={estilos.modalInput}
                onChangeText={novoTitulo => setTitulo(novoTitulo)}
                placeholder="Digite um Titulo"
                value={titulo}
              />
              <Text style={estilos.modalSubTitulo}>Categoria</Text>
              <View style={estilos.modalPicker}>
                <Picker
                  selectedValue={categoria}
                  onValueChange={novaCategoria => setCategoria(novaCategoria)}>
                  <Picker.Item label="Pessoal" value="Pessoal" />
                  <Picker.Item label="Trabalho" value="Trabalho" />
                  <Picker.Item label="Outros" value="Outros" />
                </Picker>
              </View>
              <Text style={estilos.modalSubTitulo}>Conteúdo da nota</Text>
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={3}
                onChangeText={novoTexto => setTexto(novoTexto)}
                placeholder="Digite o conteúdo"
                value={texto}
              />
              <View style={estilos.modalBotoes}>
                <TouchableOpacity
                  style={estilos.modalBotaoSalvar}
                  onPress={() => (noteToUpdate ? modificaNota() : salvaNota())}>
                  <Text style={estilos.modalBotaoTexto}>Salvar</Text>
                </TouchableOpacity>
                {noteToUpdate ? (
                  <TouchableOpacity
                    style={estilos.modalBotaoDeletar}
                    onPress={removeNota}>
                    <Text style={estilos.modalBotaoTexto}>Deletar</Text>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
                <TouchableOpacity
                  style={estilos.modalBotaoCancelar}
                  onPress={limpaModal}>
                  <Text style={estilos.modalBotaoTexto}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setModalVisivel(true);
        }}
        style={estilos.adicionarMemo}>
        <Text style={estilos.adicionarMemoTexto}>+</Text>
      </TouchableOpacity>
    </>
  );
}

const estilos = StyleSheet.create({
  centralizaModal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    marginTop: 8,
    marginHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  modalTitulo: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 18,
  },
  modalInput: {
    fontSize: 18,
    marginBottom: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#FF9A94',
  },
  modalPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#EEEEEE',
    marginBottom: 12,
  },
  modalSubTitulo: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBotaoSalvar: {
    backgroundColor: '#2ea805',
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: 'center',
  },
  modalBotaoDeletar: {
    backgroundColor: '#d62a18',
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: 'center',
  },
  modalBotaoCancelar: {
    backgroundColor: '#057fa8',
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: 'center',
  },
  modalBotaoTexto: {
    color: '#FFFFFF',
  },
  adicionarMemo: {
    backgroundColor: '#54ba32',
    justifyContent: 'center',
    height: 64,
    width: 64,
    margin: 16,
    alignItems: 'center',
    borderRadius: 9999,
    position: 'absolute',
    bottom: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  adicionarMemoTexto: {
    fontSize: 32,
    lineHeight: 40,
    color: '#FFFFFF',
  },
});
