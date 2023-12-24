import GlobalStyles from "./global-styles";
import Counter from "./components/counter/Counter";
import styled from "styled-components";
import { useState, useContext } from "react";
import DataChart from "./components/DataChart";
import { SupabaseContext } from "./context/supabase-context";

function App() {
  const [showChart, setShowChart] = useState(false);
  const { getDataForChart, counterNames, sumOfCounterValues } =
    useContext(SupabaseContext);

  const showChartHandler = () => {
    getDataForChart();

    setShowChart(!showChart);
  };

  return (
    <Wrapper>
      <GlobalStyles />

      <>
        {!showChart && <Counter />}

        {showChart && (
          <DataChart _labels={counterNames} _data={sumOfCounterValues} />
        )}

        <ShowChart
          onClick={() => {
            showChartHandler();
          }}
        >
          {showChart ? "Hide Chart" : "Show Chart"}
        </ShowChart>
      </>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  background-color: #1c1c1c;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  position: relative;
`;

const ShowChart = styled.button`
  font-size: 20px;
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 10px 20px;
  cursor: pointer;

  position: absolute;
  margin: 30px;
  top: 0;
  left: 0;
`;
