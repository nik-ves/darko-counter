import React, { useContext } from "react";
import styled from "styled-components";
import { SupabaseContext } from "../../context/supabase-context";

const ErrorBox = () => {
  const { errorMessage, setErrorMessage, errorTimer } =
    useContext(SupabaseContext);
  const ret = errorMessage ? (
    <ErrorMessage>{errorMessage}</ErrorMessage>
  ) : (
    <div></div>
  );

  if (errorMessage) {
    setTimeout(() => {
      setErrorMessage("");
    }, errorTimer);
  }

  return ret;
};

export default ErrorBox;

const ErrorMessage = styled.p`
  color: red;
  font-size: 4rem;
  padding: 1rem;
  border: 1px solid red;
  margin-bottom: 6rem;
`;
