import React, {PropsWithChildren} from 'react';
import {Modal, Platform} from 'react-native';
import styled from 'styled-components/native';

interface CustomModalProps extends PropsWithChildren {
  visible: boolean;
  closeAction: () => void;
}

const ModalBoxArea = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.View`
  width: 90%;
  padding: 20px;
  background-color: #fff;
`;

const ModalClose = styled.TouchableHighlight`
  height: 40px;
  align-self: flex-end;
`;

const CloseText = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 25px;
`;

const ModalBody = styled.View``;

export default ({visible, children, closeAction}: CustomModalProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <ModalBoxArea behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ModalBox>
          <ModalClose onPress={closeAction} underlayColor="transparent">
            <CloseText>X</CloseText>
          </ModalClose>
          <ModalBody>{children}</ModalBody>
        </ModalBox>
      </ModalBoxArea>
    </Modal>
  );
};
