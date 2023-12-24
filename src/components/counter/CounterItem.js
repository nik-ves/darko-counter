import React, { useState, useContext } from "react";
import styled from "styled-components";
import { SupabaseContext } from "../../context/supabase-context";

const CounterItem = ({ item, selectedDate }) => {
  let valuesObject = item.values[0];
  let value = valuesObject ? valuesObject.value : 0;

  const [counterValue, setCounterValue] = useState(value);
  const { isSelectedDateValid, modifyCounter } = useContext(SupabaseContext);

  const dateValid = isSelectedDateValid(selectedDate);
  return (
    <>
      <CounterTitle>{item.name}</CounterTitle>

      <CounterNumber>{counterValue}</CounterNumber>

      <Increase
        onClick={() => {
          setCounterValue(counterValue + 1);
          modifyCounter(item, value, selectedDate);
        }}
        disabled={!dateValid}
      >
        +
      </Increase>
    </>
  );
};

export default CounterItem;

const CounterTitle = styled.h3`
  font-size: 40px;
  border-bottom: 3px solid black;
`;

const CounterNumber = styled.p`
  font-size: 40px;
  margin: 30px 0;
`;

const Increase = styled.button`
  width: 150px;
  font-size: 40px;
  align-self: center;
  border: 3px solid black;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;