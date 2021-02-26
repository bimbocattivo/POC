import React, { Fragment, useState } from 'react';
import { NavDropdown } from 'react-bootstrap'
import {Progress,Message} from './';
import axios from 'axios';
//import api from '../../utils';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
/*
  let formData = new FormData();
  formData.append('key1', file);
  formData.append('key2', 'value2');
 
  // List key/value pairs
  for(let [name, value] of formData) {
    console.log('File upload key1:',name,'value:',value)
    //alert(`${name} = ${value}`); // key1 = value1, then key2 = value2
  } */
  const onChange = e => {
    setFile(e.target.files);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData =new FormData();
    
    const body1='hello dody'
    formData.append('file',file[0])
    //const x=formData.get('file')
    console.log('File upload:',body1)
    
    try {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const res = await axios.post('/api/data/upload-file',formData,config,{
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };



  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit} method="get" encType= 'multipart/form-data'>
        <div className='custom-file mb-4'>
          <input
            type="file"
          
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />
        <NavDropdown title={'Seleziona dato'} id='username'>
                 
                    <NavDropdown.Item>Profile</NavDropdown.Item>
               
                  <NavDropdown.Item onClick={onChange} >
                    Logout
                  </NavDropdown.Item>
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <input
          type='submit'
          value='Seleziona dato'
          
          //className='btn btn-primary btn-block mt-4'
        />
        </NavDropdown>
        <input
          type='submit'
          value='Seleziona dato'
          
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;