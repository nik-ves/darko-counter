import styled from "styled-components";

import { useEffect, useState } from "react";
import useSupabase from "../hooks/use-supabase";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";

const Counter = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    getData,
    returnedData,
    modifyCounter,
    errorMessage,
    setErrorMessage,
    getDataForChart,
    isSelectedDateValid,
  } = useSupabase();

  useEffect(
    () => {
      getData();
      getDataForChart();
    },
    // eslint-disable-next-line
    []
  );

  const modifiedDate = (value) => {
    setSelectedDate(value);

    getData(value);
  };

  if (errorMessage) {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }

  const dateValid = isSelectedDateValid(selectedDate);

  return (
    <>
      <Logo>Darko's Words Counter</Logo>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <Actions>
        {" "}
        <NewDatePicker
          onChange={modifiedDate}
          value={selectedDate}
          format="y-MM-dd"
        />
        <AddNewCounter>New Counter</AddNewCounter>
      </Actions>

      {returnedData?.map(function (item) {
        let valuesObject = item.values[0];
        let value = valuesObject ? valuesObject.value : 0;

        return (
          <CounterBody key={item.id}>
            <CounterTitle>{item.name}</CounterTitle>

            <CounterNumber>{value}</CounterNumber>

            <Increase
              onClick={() => {
                modifyCounter(item, value, selectedDate);
              }}
              disabled={!dateValid}
            >
              +
            </Increase>
          </CounterBody>
        );
      })}
    </>
  );
};

export default Counter;

const AddNewCounter = styled.button`
  border: 1px solid white;
  padding: 0 20px;
  background-color: transparent;
  color: white;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 40px;
  padding: 10px;
  border: 1px solid red;
  margin-bottom: 60px;
`;

const Actions = styled.div`
  width: 800px;
  margin-bottom: 20px;

  display: flex;
  justify-content: space-between;
`;

const NewDatePicker = styled(DatePicker)`
  color: white;

  .react-date-picker__button:enabled:hover .react-date-picker__button__icon,
  .react-date-picker__button:enabled:focus .react-date-picker__button__icon,
  .react-date-picker__button:enabled:not(:hover)
    .react-date-picker__button__icon {
    stroke: white;
  }
`;

const Logo = styled.h1`
  color: white;
  font-size: 60px;
  border-bottom: 3px solid white;
  margin-bottom: 60px;
`;

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
