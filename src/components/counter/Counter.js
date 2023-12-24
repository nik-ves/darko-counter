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

const Counter = () => {
  const { getData, getDataForChart, returnedData } =
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

      {/* <ErrorBox message={errorMessage} /> */}

      <Actions>
        <NewDatePicker
          onChange={modifiedDate}
          value={selectedDate ? selectedDate : new Date()}
          format="y-MM-dd"
        />
      </Actions>

      <NewCounter />

      {returnedData?.map(function (item) {
        return (
          <CounterList key={item.id}>
            <CounterItem item={item} selectedDate={selectedDate} />
          </CounterList>
        );
      })}
    </>
  );
};

export default Counter;

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
