import React, { useContext } from "react";
import styled from "styled-components";
import { SupabaseContext } from "../../context/supabase-context";

const CounterItem = ({ item, value, selectedDate }) => {
  const { isSelectedDateValid, modifyCounter } = useContext(SupabaseContext);

  const dateValid = isSelectedDateValid(selectedDate);
  return (
    <>
      <CounterTitle>{item.name}</CounterTitle>

      <Actions>
        <CounterNumber>{value}</CounterNumber>

        <Increase
          onClick={() => {
            modifyCounter(item, value, selectedDate);
          }}
          disabled={!dateValid}
        >
          +
        </Increase>
      </Actions>
    </>
  );
};

export default CounterItem;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const CounterTitle = styled.h3`
  font-size: 2rem;
  text-transform: uppercase;
  color: black;
`;

const CounterNumber = styled.p`
  font-size: 2rem;
  margin-right: 2rem;
  font-weight: 700;
`;

const Increase = styled.button`
  width: 5rem;
  font-size: 2rem;
  align-self: center;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: 0.2s all;

  background-color: transparent;

  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${(props) => (props.disabled ? "grey" : "black")};

  &:hover {
    border: 2px solid white;
  }
`;
