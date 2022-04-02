import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Table from "../components/table/table";
import styled from "@emotion/styled";
import axios from "axios";

const Wrap = styled(Box)`
  width: 100%;
  background-color: #f7f7f7;
  min-height: 100vh;
`;
function Example() {
  const [columns] = useState([
    { name: "FirstName", title: "First Name" },
    { name: "LastName", title: "Last Name" },
    { name: "Position", title: "Position" },
    { name: "Address", title: "Address" },
  ]);
  const [data, setData] = useState([]);

  useEffect(() => {
    //@API CALL for location select data
    axios.get("/users").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Wrap>
      <Table columns={columns} data={data} />
    </Wrap>
  );
}

export default Example;
