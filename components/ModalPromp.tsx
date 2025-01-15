import Dialog from "react-native-dialog";
const { Container, Title, Input, Button } = Dialog

interface Props {
  onClose?: () => void,
  title?: string,
  isVisible?: boolean,
  inputValue?: string,
  onChangeText?: (value: string) => void,
}

export const ModalPromp = ({ isVisible, onClose = () => {}, title, inputValue, onChangeText }: Props) => {

  return (
    <Container visible={ isVisible } onBackdropPress={ onClose }>
      <Title>{ title }</Title>
      <Input value={ inputValue } autoCapitalize='none' onChangeText={ onChangeText } keyboardType="url"/>
      <Button label="OK" onPress={ onClose } />
    </Container>
  )
}

export default ModalPromp;