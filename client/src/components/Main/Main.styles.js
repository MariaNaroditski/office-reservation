import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  min-height: 600px;
  width: 100%;
  height: 100%;
  background: white;
  align-items: center;
  text-align: center;
  -webkit-box-shadow: -5px 13px 41px 58px rgba(163, 163, 163, 0.81);
  -moz-box-shadow: -5px 13px 41px 58px rgba(163, 163, 163, 0.81);
  box-shadow: -5px 13px 41px 58px rgba(163, 163, 163, 0.81);
`;
export const Title = styled.h1`
  font-size: 3.125em;
  font-weight: 600;
  margin: 1.2em auto 0;
`;

export const Explanation = styled.p`
  font-family: sans-serif;
  font-size: 1.4em;
  font-weight: 100;
  margin: 1.4em auto 2.5em;
`;
