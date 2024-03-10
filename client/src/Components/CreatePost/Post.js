import React, { useEffect, useState } from 'react';
import  Axios from 'axios';
import Modal from 'react-modal';
import {Navigate} from 'react-router-dom';

const Post = () => {
  const [selectimage, setSelectimage] = useState('');
  const [urlimage,setUrlimage]= useState('');
  const [userdata, setUserdata] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  const getUser = async () =>{
    try {
      const response = await Axios.get("http://localhost:3002/login/success", {withCredentials: true});
      console.log(response);
      setUserdata(response.data.user);
      setId(response.data.user._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();

  },[]);

  const uploadImage = () =>{
    const formData = new FormData()
    formData.append("file",selectimage );
    formData.append("upload_preset","rocedmmv");

    Axios.post("https://api.cloudinary.com/v1_1/dunedclqa/image/upload", formData)
    .then((response) => {
        setUrlimage(response.data.url);
        setIsModalOpen(true);        
    });
  }

  const createpost = async () =>{
    console.log(id);

    const post ={
      "title": title,
      "description": description,
      "image" : urlimage
    };

    const response = await fetch(`http://localhost:3002/home/posts/${id}`, {
      method : 'POST',
      body : JSON.stringify(post),
      headers : {
        'Content-Type': 'application/json'
      }
    });

    if(response.status === 200)
    {
      setIsModalOpen(true);
    }
    
  }

  const closeModalAndRedirect = () =>{
    setIsModalOpen(false);
    <Navigate to="/" />
  }

  return (
    <>
      <div className='container'>
        <div className='row mt-5'>
            <div className='col-lg-6 card' style={{position:'relative',marginLeft:'25%'}}>
                <div className='card-head mt-2' style={{textAlign:'center'}}>
                  <h4>Create a Post</h4>
                </div>
                <div className='card-body'>
                  <form onSubmit={createpost}>
                    <div className='form-group mt-3'>
                      <label for="titleText" className='h5'>Title</label>
                      <input type='text' name='titlename' className='form-control' placeholder='Enter post title here..' onChange={(e)=>setTitle(e.target.value)} />
                    </div>
                    <div className='form-group mt-3'>
                      <label for="Description" className='h5'>Description</label>
                      <textarea type="text  " rows="4" cols="77" name='description' className='form-control' placeholder='Write Description....' onChange={(e)=> setDescription(e.target.value)} > 
                      </textarea>
                    </div>
                    <div className='form-group mt-2 mb-2'>
                      <label for="Images" className='h5'>Images</label>
                      <div style={{border:'1px solid black', maxWidth:'400px',  maxHeight:'400px', marginLeft:'100px'}}>
                            <img src={urlimage} name="image" alt='no image' height={400} width={400} />
                      </div>
                      <div style={{width:'100%'}}>
                        <div style={{width:'70%', display:'inline', float:'left'}}>
                            <input type='file'   className='form-control mt-4' onChange={(e) => setSelectimage(e.target.files[0])}/>
                        </div>
                        <div style={{width:'20%', display:'inline', float:'right',marginTop:'25px'}}>
                            <button type='button'className='btn btn-outline-success'  onClick={uploadImage}>Upload</button>
                        </div>
                      </div>               
                    </div>
                      <Modal  style={{
                        overlay: {
                          backgroundColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        content: {
                          width: '400px', 
                          height: '200px', 
                          margin: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }
                      }}
                      width="200px" height='200px' isOpen={isModalOpen}  onRequestClose={() => setIsModalOpen(false)}  contentLabel="Registration Successful">
                        <h2>Image Upload Successful</h2>
                        <button onClick={closeModalAndRedirect}>Close</button>

                      </Modal>
                    <div className='form-group'>
                        <button type='submit' className='mt-5 btn btn-primary ' style={{marginLeft:'40%'}} >Create Post</button>
                    </div>
                  </form>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Post