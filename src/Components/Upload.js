import React from 'react';

function Upload(props) {
  return (
    <div>
      <input type='file' onChange={props.fileSubmit}></input>
    </div>
  );
}

export default Upload;
