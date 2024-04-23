import styled from 'styled-components/native';

type TouchableHighlightProps = {
  width?: string;
  bgcolor?: string;
};

export default styled.TouchableHighlight<TouchableHighlightProps>`
  width: ${props => `${props.width}px` || 'auto'};
  background-color: ${props => props.bgcolor || '#eee'};
  padding: 10px 20px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;
