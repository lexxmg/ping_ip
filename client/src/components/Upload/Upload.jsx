
import React from 'react';
import './upload.css';
import ReactFileReader from 'react-file-reader';

const Upload = ({handleFiles, ipTest, upload}) => {
  return (
    <div className="upload">
      <ReactFileReader fileTypes={".csv"} multipleFiles={true} handleFiles={upload}>
        <button className='btn'>Upload</button>
      </ReactFileReader>

      <input onChange={e => {upload(e.target.files[0])}} type="file" name="ip" />

      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Номер</th>
          </tr>
        </thead>

        <tbody>
          {
            ipTest.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.tel}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Upload;
