import React from 'react'
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Form from '../components/form'


const Wrap = styled(Box)`
  width: 100%;
  background-color: #f7f7f7;
  min-height: 100vh;
`;
function Home() {
  return (
<Wrap>
    <Form/>
</Wrap>
  )
}

export default Home