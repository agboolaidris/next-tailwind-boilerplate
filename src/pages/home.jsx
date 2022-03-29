import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Form from "../components/form";
import Table from "../components/table";
import axios from "axios";

const Wrap = styled(Box)`
  width: 100%;
  background-color: #f7f7f7;
  min-height: 100vh;
`;
function Home() {
  const [columns] = useState([
    { name: "name", title: "Name" },
    { name: "username", title: "Username" },
    { name: "email", title: "Email" },
    { name: "phone", title: "Phone Number" },
    { name: "website", title: "website" },
  ]);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([{ name: "idris", email: "sssgg" }]);
    //@API CALL for location select data
    axios.get("/users").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Wrap>
      {/* <Form /> */}
      <Table columns={columns} data={data} />
    </Wrap>
  );
}

export default Home;
