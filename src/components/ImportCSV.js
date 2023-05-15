import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

const uploadToServer = (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  return axios.post(
    "http://localhost:3000/tradehistory/csv/upload",
    formData,
    { firebase_uid: "hJ8keLcP5lOEmdXpo4U1pggYzRC3" },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    }
  );
};

const App = () => {
  const [data, setData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };

  const upload = () => {
    let currentFile = selectedFiles[0];

    setProgress(0);
    setCurrentFile(currentFile);

    uploadToServer(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then(async (response) => {
        setMessage(response.data.message);
        const result = await axios("http://localhost:3000/tradehistory");
        setData(result.data);
      })
      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setCurrentFile(undefined);
      });

    setSelectedFiles(undefined);
  };

  return (
    <div className="App">
      <div>
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        <label className="btn btn-default">
          <input type="file" onChange={selectFile} />
        </label>

        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={upload}
        >
          Upload
        </button>

        <div className="alert alert-light" role="alert">
          {message}
        </div>
      </div>
    </div>
  );
};

export default App;
