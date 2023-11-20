import styled from "styled-components";

const Counter = () => {
  return (
    <Wrapper>
      <Logo>Darko Counter</Logo>

      <CounterBody>
        <h2>Merge</h2>

        <Number>3</Number>

        <Button>+</Button>
      </CounterBody>

      <CounterBody>
        <h2>Release</h2>
        <h2>{process.env.NIKOLA_TEST} + TEST</h2>

        <Number>3</Number>

        <Button>+</Button>
      </CounterBody>
    </Wrapper>
  );
};

export default Counter;

const Logo = styled.h1`
  color: white;
  font-size: 40px;
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  background-color: #1c1c1c;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const CounterBody = styled.div`
  height: 300px;
  width: 400px;
  background-color: white;
  margin-top: 50px;
  border-radius: 6px;
  text-align: center;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 60px;
  font-size: 30px;
  align-self: center;
  background-color: transparent;
  border: 1px solid black;
  cursor: pointer;
  border-radius: 6px;
`;

const Number = styled.p`
  font-size: 60px;
`;
