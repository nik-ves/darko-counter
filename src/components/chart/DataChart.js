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
import Container from "../ui/Container";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y",
  plugins: {
    title: {
      display: true,
      text: "Sum of all used phrases by Darko",
    },
  },
  responsive: true,
  maintainAspectRatio: true,
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
    <Container>
      <LogoBox>
        <Logo>Darko's Chart</Logo>
      </LogoBox>

      <ChartBox>
        <BarChart options={options} data={data} />
      </ChartBox>
    </Container>
  );
};

export default DataChart;

const LogoBox = styled.div`
  margin-bottom: 6rem;
  display: flex;
  justify-content: center;
`;

const Logo = styled.h1`
  color: white;
  font-size: 3.5rem;
  border-bottom: 3px solid white;

  @media only screen and (max-width: 600px) {
    font-size: 3rem;
  }

  @media only screen and (max-width: 300px) {
    font-size: 2rem;
  }
`;

const ChartBox = styled.div``;

const BarChart = styled(Bar)`
  width: 100%;
`;
