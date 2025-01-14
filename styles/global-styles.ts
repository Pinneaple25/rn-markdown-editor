import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
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