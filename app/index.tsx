import { Pressable, StyleSheet, View, TextInput } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export const MarkdownApp = () => {
  return (
    <View
      style={styles.container}
    >
      <TextInput
        style={styles.textInput}
        multiline
      />

      <View style={ styles.buttonsContainer }>
        <Pressable style={ styles.button } onPress={() => console.log('Save data')}>
          <Ionicons name="save" size={32} color="green" />
        </Pressable>

        <Pressable style={ styles.button } onPress={() => console.log('Send information')}>
          <Ionicons name="send" size={32} color="blue" />
        </Pressable>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top'
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 15,
    alignSelf: 'center'
  },
  button: {
    height: 32,
    width: 32,
  }
});


export default MarkdownApp;