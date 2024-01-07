import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { SupabaseContext } from "../../context/supabase-context";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import NewCounter from "./NewCounter";
import CounterList from "./CounterList";
import CounterItem from "./CounterItem";
import ErrorBox from "../ui/ErrorBox";
import Container from "../ui/Container";

const Counter = () => {
  const { getData, getDataForChart, returnedData, errorMessage } =
    useContext(SupabaseContext);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const modifiedDate = (value) => {
    setSelectedDate(value);

    getData(value);
  };

  useEffect(
    () => {
      getData();
      getDataForChart();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <>
      <Logo>Darko's Words Counter</Logo>

      <ErrorBox message={errorMessage} />

      <Container>
        <Actions>
          <NewDatePicker
            onChange={modifiedDate}
            value={selectedDate ? selectedDate : new Date()}
            format="y-MM-dd"
          />
        </Actions>

        <NewCounter />

        {returnedData?.map(function (item) {
          let valuesObject = item.values[0];
          let value = valuesObject ? valuesObject.value : 0;

          return (
            <CounterList key={item.id}>
              <CounterItem
                item={item}
                value={value}
                selectedDate={selectedDate}
              />
            </CounterList>
          );
        })}
      </Container>
    </>
  );
};

export default Counter;

const Actions = styled.div`
  width: 80rem;
  max-width: 100%;
  margin-bottom: 2rem;

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

  font-size: 13px;
`;

const Logo = styled.h1`
  color: white;
  font-size: 3.5rem;
  border-bottom: 3px solid white;
  margin-bottom: 6rem;

  @media only screen and (max-width: 600px) {
    font-size: 3rem;
  }

  @media only screen and (max-width: 300px) {
    font-size: 2rem;
  }
`;
