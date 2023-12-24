import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export const SupabaseContext = React.createContext({
  getData: () => {},
  returnedData: [],
  getDataForChart: () => {},
  isSelectedDateValid: () => {},
  modifyCounter: () => {},
  insertCounter: () => {},
  counterNames: [],
  sumOfCounterValues: [],
  errorMessage: "",
  setErrorMessage: () => {},
  errorTimer: "",
});

const SupabaseContextProvider = (props) => {
  const [returnedData, setReturnedData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorTimer, setErrorTimer] = useState(3000);
  const [counterNames, setCounterNames] = useState([]);
  const [sumOfCounterValues, setSumOfCounterValues] = useState([]);

  const supabaseUrl = "https://sxxwztrzwenllqtaimtl.supabase.co";
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const formatDateToString = (_date) => {
    if (_date) {
      // 01, 02, 03, ... 29, 30, 31
      let dd = (_date.getDate() < 10 ? "0" : "") + _date.getDate();
      // 01, 02, 03, ... 10, 11, 12
      let MM = (_date.getMonth() + 1 < 10 ? "0" : "") + (_date.getMonth() + 1);
      // 1970, 1971, ... 2015, 2016, ...
      let yyyy = _date.getFullYear();

      return yyyy + "-" + MM + "-" + dd;
    }
  };

  const getDataForChart = async () => {
    const { data, error } = await supabase.from("counters").select(
      `
    id, 
    name, 
    values (*)
    `
    );

    let counterNamesArray = [];
    let sumOfCounterValuesArray = [];
    let sum = 0;

    data.forEach((counter) => {
      counterNamesArray = [...counterNamesArray, counter.name];
      let counterLines = counter.values;

      sum = 0;
      counterLines.forEach((line) => {
        sum += line.value;
      });

      sumOfCounterValuesArray = [...sumOfCounterValuesArray, sum];
    });

    setCounterNames(counterNamesArray);
    setSumOfCounterValues(sumOfCounterValuesArray);

    if (!error) {
    } else {
      setErrorMessage(error.message);
      setErrorTimer(3000);
    }
  };

  const getData = async (_date) => {
    const date = _date
      ? formatDateToString(_date)
      : formatDateToString(new Date());

    const { data, error } = await supabase
      .from("counters")
      .select(
        `
      id, 
      name, 
      values (*)
      `
      )
      .eq("values.created_at", date);

    if (!error && data) {
      setReturnedData(data);
    } else {
      setErrorMessage(error.message);
      setErrorTimer(3000);
    }
  };

  const insertData = async (_counter, _value) => {
    const { error } = await supabase.from("values").insert({
      counters_id: _counter.id,
      value: _value + 1,
      created_at: formatDateToString(new Date()),
    });

    if (!error) {
      getData();
    } else {
      setErrorMessage(error.message);
      setErrorTimer(3000);
    }
  };

  const updateData = async (_counter, _value) => {
    const { error } = await supabase
      .from("values")
      .update({ value: _value + 1 })
      .eq("counters_id", _counter.id)
      .eq("created_at", formatDateToString(new Date()));

    if (!error) {
      getData();
    } else {
      setErrorMessage(error.message);
      setErrorTimer(3000);
    }
  };

  const modifyCounter = (_counter, _value, _selectedDate) => {
    if (errorMessage === "") {
      if (_value === 0) {
        insertData(_counter, _value);
      } else {
        updateData(_counter, _value);
      }
    }
  };

  const isSelectedDateValid = (_selectedDate = new Date()) => {
    let formatedSelectedDate = formatDateToString(_selectedDate);
    let formatedToday = formatDateToString(new Date());
    let ret = true;

    if (
      formatedSelectedDate > formatedToday ||
      formatedSelectedDate < formatedToday
    ) {
      ret = false;
    }

    return ret;
  };

  const insertCounter = async (_name) => {
    const { error } = await supabase
      .from("counters")
      .insert({
        name: _name,
      })
      .select();

    if (!error) {
      getData();
    } else {
      setErrorMessage(error.message);
      setErrorTimer(3000);
    }
  };

  const providerValue = {
    getData,
    returnedData,
    getDataForChart,
    isSelectedDateValid,
    modifyCounter,
    insertCounter,
    counterNames,
    sumOfCounterValues,
    errorMessage,
    setErrorMessage,
    errorTimer,
  };

  return (
    <SupabaseContext.Provider value={providerValue}>
      {props.children}
    </SupabaseContext.Provider>
  );
};

export default SupabaseContextProvider;
