import GlobalStyles from "./global-styles";
import Counter from "./components/counter/Counter";
import styled from "styled-components";
import { useState, useContext } from "react";
import DataChart from "./components/chart/DataChart";
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
  background-color: #363031;
  flex-direction: column;
  align-items: center;
  padding-top: 7rem;
  position: relative;
`;

const ShowChart = styled.button`
  font-size: 1.5rem;
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;

  position: absolute;
  margin: 1.5rem;
  top: 0;
  left: 0;
`;
