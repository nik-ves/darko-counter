import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Sum of all used phrases by Darko",
    },
  },
};

const DataChart = ({ _labels, _data }) => {
  const labels = _labels;

  const data = {
    labels,
    datasets: [
      {
        label: "Darko's Phrases",
        data: _data,
        backgroundColor: "white",
      },
    ],
  };

  return (
    <>
      <Logo>Darko's Chart</Logo>

      <ChartBox>
        <Bar options={options} data={data} />
      </ChartBox>
    </>
  );
};

export default DataChart;

const Logo = styled.h1`
  color: white;
  font-size: 60px;
  border-bottom: 3px solid white;
  margin-bottom: 60px;
`;

const ChartBox = styled.div`
  width: 1000px;
  height: auto;
`;
