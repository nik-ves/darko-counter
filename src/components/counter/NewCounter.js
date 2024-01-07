import { useState, useContext } from "react";
import styled from "styled-components";
import { SupabaseContext } from "../../context/supabase-context";

const NewCounter = () => {
  const [counterName, setCounterName] = useState("");
  const { insertCounter } = useContext(SupabaseContext);

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="Create a new counter here..."
        onChange={(event) => {
          setCounterName(event.target.value);
        }}
        value={counterName}
      />

      <AddButton
        onClick={() => {
          if (counterName) {
            insertCounter(counterName);
            setCounterName("");
          }
        }}
      >
        Add
      </AddButton>
    </Wrapper>
  );
};

export default NewCounter;

const Wrapper = styled.div`
  width: 80rem;
  max-width: 100%;
  margin-bottom: 2rem;

  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 80%;
  max-width: 100%;
  font-size: 1.5rem;
  padding: 0.75rem;
  border-radius: 4px;
  border: 2px solid white;
  outline: none;
  font-family: "Courier New", Courier, monospace;
  background-color: #c2bcbd;
`;

const AddButton = styled.button`
  width: 15%;
  font-family: "Courier New", Courier, monospace;
  border: 2px solid white;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
  color: white;
  text-transform: uppercase;
  font-size: 1.5rem;
  transition: 0.2s all;

  &:hover {
    background-color: #c2bcbd;
  }
`;
