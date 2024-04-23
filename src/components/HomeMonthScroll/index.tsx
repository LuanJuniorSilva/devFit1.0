/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import styled from 'styled-components/native';

type HomeMonthScrollProps = {
  selectedMonth: number;
  setSelectedMonth: Dispatch<SetStateAction<number>>;
};

const MonthScroll = styled.ScrollView`
  width: 100%;
  height: 60px;
  background-color: #fff;
`;
const MonthButton = styled.TouchableHighlight<{width: number}>`
  width: ${props => props.width}px;
  justify-content: center;
  align-items: center;
`;
const MonthItem = styled.View`
  width: 90%;
  height: 30px;
  background-color: #eee;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;
const MouthText = styled.Text`
  color: #000;
  font-weight: bold;
`;

let months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const screenWidth = Math.round(Dimensions.get('window').width);
let thirdW = screenWidth / 3;

export default ({selectedMonth, setSelectedMonth}: HomeMonthScrollProps) => {
  const [selectedMyMonth, setSelectedMyMonth] = useState(selectedMonth);
  const monthRef = useRef<ScrollView>(null);

  const handleScrollEnd = e => {
    let posX = e.nativeEvent.contentOffset.x;
    let targetMonth = Math.round(posX / thirdW);
    setSelectedMyMonth(targetMonth);
  };

  const scrollToMonth = (m: number) => {
    let posX = m * thirdW;
    monthRef.current?.scrollTo({x: posX, y: 0, animated: true});
  };

  useEffect(() => {
    setSelectedMonth(selectedMyMonth);
  }, [selectedMyMonth]);

  useEffect(() => {
    setTimeout(() => {
      scrollToMonth(selectedMyMonth);
    }, 10);
  }, [selectedMonth]);

  return (
    <MonthScroll
      ref={monthRef}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      snapToInterval={thirdW}
      decelerationRate="fast"
      contentContainerStyle={{paddingHorizontal: thirdW}}
      onMomentumScrollEnd={handleScrollEnd}>
      {months.map((m, k) => (
        <MonthButton
          key={k}
          width={thirdW}
          underlayColor="transparent"
          onPress={() => setSelectedMyMonth(k)}>
          <MonthItem
            style={
              k === selectedMyMonth
                ? {backgroundColor: '#CCC', width: '100%', height: 40}
                : {}
            }>
            <MouthText>{m}</MouthText>
          </MonthItem>
        </MonthButton>
      ))}
    </MonthScroll>
  );
};
