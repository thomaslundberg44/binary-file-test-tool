import React, { useState } from 'react';
import axios from 'axios';
import { requestHeadersConfig } from '../config/config';

function CxxFileUpload() {

  const [uploadedFile, setUploadedFile] = useState(null);
  const [cxxData, setCxxData] = useState({});

  const onFileChange = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  const onSubmit = async () => {
    if (uploadedFile) {
      const formData = new FormData();
      formData.append(
        "cxxFile",
        uploadedFile,
        uploadedFile.name
      );

      const { data } = await axios.post(
        "http://localhost:8080/binary-files/read-cxx-file",
        formData,
        requestHeadersConfig
      );
      setCxxData(data);
    } else {
      console.warn('no file selected!');
    }
  }

  return (
    <div>
      <h3>Upload a CXX file</h3>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onSubmit}>Submit</button>
      </div>
        {
          Object.keys(cxxData).length > 0 && (
            <div>
              <h3>Data</h3>
                <div>
                  {
                    Object.keys(cxxData).map((key, index) => (
                      <li key={index}>{`${key} : ${cxxData[key]}`}</li>
                    ))
                  }
                </div>
            </div>
          )
        }
    </div>
  );
}

export default CxxFileUpload;