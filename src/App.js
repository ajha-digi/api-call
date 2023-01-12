import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([])
  const [singleData, setSingleData] = useState({})
  const [formData, setFormData] = useState({
    id:"",
    title:"",
    author:""
  })

  const fetchData = async () => {
    const resp = await axios('http://localhost:4000/posts');
    setData(resp.data);
  }

  useEffect(()=>{
    fetchData();
  },[])

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const getUser = id => {
    const fetchUser = async () => {
      const resp = await axios('http://localhost:4000/posts/'+id);
      setSingleData(resp.data);
    }
    fetchUser();
  }

  const deleteUser = id => {
    const deleteUser = async () => {
      const resp = await axios.delete('http://localhost:4000/posts/'+id);
      fetchData();
    }
    deleteUser();
  }

  const handleSubmit = e => {
    e.preventDefault();
    // const postData = async () => {
    //   const resp = await axios.post('http://localhost:4000/posts',formData);
    //   fetchData();
    // }
    // postData();

    const patchData = async () => {
      const id = formData.id;
      const resp = await axios.patch('http://localhost:4000/posts/'+id,formData);
      fetchData();
    }
    patchData();
  }

  const editUser = user => {
    setFormData(user)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input name="id" value={formData.id} placeholder='id' type="text" onChange={handleChange} /> <br />
        <input name="title" value={formData.title} placeholder='title' type="text" onChange={handleChange} /> <br />
        <input name="author" value={formData.author} placeholder='author' type="text" onChange={handleChange} /> <br />
        <input type="submit" value="save"/>
      </form>
      {/* <input value={name} onChange={handleChange} /> */}
      {/* <button onClick={handleClick}>{inc}</button> */}
      <ul>
      {
        data.map(user => (
          // <li key={user.id} onClick={()=>getUser(user.id)}>{user.title}</li>
          // <li key={user.id} onClick={()=>deleteUser(user.id)}>{user.title}</li>
          <li key={user.id} onClick={()=>editUser(user)}>{user.title}</li>
        ))
      }
      </ul>
      <div>
        {
          JSON.stringify(singleData, null, 2)
        }
      </div>
    </div>
  );
}

export default App;
