import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    margin: 12,
    textAlignVertical: 'top',
  },
  toolsContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 10,
    flexDirection: 'row',
    gap: 25,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  }
});