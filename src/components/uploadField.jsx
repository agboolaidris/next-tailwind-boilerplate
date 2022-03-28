import React from "react";

//@INFO: component to upload file
//@PROPS: handle {(e:event)=> void}
//@PROPPS: accept:string(file accept type) eg '.docx', '.pdf'

function UploadField({ accept, handleChange }) {
  return (
    <div>
      <input required type="file" accept={accept} onChange={handleChange} />
    </div>
  );
}

export default UploadField;
