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
  width: 800px;
  margin-bottom: 20px;

  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 80%;
  font-size: 15px;
  padding: 10px;
  border-radius: 4px;
  outline: none;
  font-family: "Courier New", Courier, monospace;
`;

const AddButton = styled.button`
  width: 15%;
  font-family: "Courier New", Courier, monospace;
  border: 1px solid grey;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
`;
