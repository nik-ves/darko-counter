import React, { useState } from "react";
import styled from "styled-components";

const ErrorBox = ({ message }) => {
  // const { errorMessage, setErrorMessage, errorTimer } = useSupabase();
  // const [test, setTest] = useState(errorMessage);
  // const ret = test ? <ErrorMessage>{message}</ErrorMessage> : <div></div>;

  // // console.log(message);

  // if (test) {
  //   setTimeout(() => {
  //     setTest("");
  //   }, errorTimer);
  // }

  return <ErrorMessage>{message}</ErrorMessage>;
};

export default ErrorBox;

const ErrorMessage = styled.p`
  color: red;
  font-size: 40px;
  padding: 10px;
  border: 1px solid red;
  margin-bottom: 60px;
`;
