import React from "react";
import styled from "styled-components";

const CounterList = (props) => {
  return <CounterBody>{props.children}</CounterBody>;
};

export default CounterList;

const CounterBody = styled.div`
  margin-bottom: 1.5rem;
  background-color: #c2bcbd;
  border: 2px solid black;
  display: flex;
  color: black;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  max-width: 100%;
  border-radius: 4px;
`;
