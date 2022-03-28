import React,{useState,useEffect} from 'react';
import axios from 'axios'
import styled from '@emotion/styled';
import {Button, Stack} from '@mui/material'

//@INFO: component for selectField
//@PROPS: handleChange {(e:event)=> void}
//@PROPPS: value:string
//@PROPPS: placeholder:string
//@PROPS: items:{value:any, title:string}[]
//@PROPS: name:string
import SelectField from './selectField';

//@INFO: component to upload file
//@PROPS: handle {(e:event)=> void}
//@PROPPS: accept:string(file accept type) eg '.docx', '.pdf'
import UploadField from './uploadField';


const FormWrap = styled.form`
    background:#ffffff;
    padding:100px 30px;
`

function Form() {
  const [propertiesData, setPropertiesData] = useState([{value:1,title:"abuja"}]);
  const [mastersData, setMastersData] = useState([{value:1,title:"lagos"}]);
  const [loading, setLoading] = useState(false);
  const [formInput, setFormInput] = useState({
    filename: "",
    master: "",
    property: "",
    fileType: "",
    fileSize: "",
    file: "",
  });


  useEffect(() => {
    //@API CALL for location select data
    axios.get("/").then((res) => {
      // const properties = res.data?.properties.map((re) => {
      //   return { value: re.id, title: re.name };
      // });
      // setPropertiesData(properties);

      // const masters = res.data?.masters.map((re) => {
      //   return { value: re.id, title: re.name };
      // });
      // setMastersData(masters);
    });
  });

  const handleChange = (e) => {

    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFile = (e) => {
    setFormInput({
      ...formInput,
      filename:e.target.files[0].name,
      fileSize:e.target.files[0].size,
      fileType:e.target.files[0].type,
      file:e.target.files[0]
      });
  };

    //submit form func
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      let formData = new FormData();
      formData.append('file', formInput.file);
      formData.append('fileName', formInput.filename);
      formData.append('fileSize', formInput.fileSize);
      formData.append('fileType', formInput.fileType);
      formData.append('master', formInput.master);
      formData.append('property', formInput.property);
    
     axios
        .post("/", formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err)
          setLoading(false);
        });
    };

  return (
    <FormWrap onSubmit={handleSubmit}>
       
       <Stack direction={{xs:"column", md:"row"}} spacing={2} justifyContent="space-between">
       <UploadField  handleChange={handleChangeFile} placeholder="upload file" />
        <Stack  direction={{xs:"column", md:"row"}} spacing={2}>
        <SelectField
              handleChange={handleChange}
              name="property"
              value={formInput.property}
              placeholder="Property"
              items={propertiesData}
            />

            <SelectField
              handleChange={handleChange}
              name="master"
              value={formInput.master}
              placeholder="Master"
              items={mastersData}
            />
        </Stack>
       </Stack>
       <Button variant='contained' type="submit">{loading ? 'Loading' : "Submit"}</Button>
    </FormWrap>
  )
}

export default Form