import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Form from "../components/form";
import Table from "../components/table";

const Wrap = styled(Box)`
  width: 100%;
  background-color: #f7f7f7;
  min-height: 100vh;
`;
function Home() {
  return (
    <Wrap>
      <Form />
      <Table />
    </Wrap>
  );
}

export default Home;
