import React from "react";
import styled from "styled-components";

const CounterList = (props) => {
  return <CounterBody>{props.children}</CounterBody>;
};

export default CounterList;

const CounterBody = styled.div`
  margin-bottom: 30px;
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 800px;
  border-radius: 4px;
`;
