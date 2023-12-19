import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import "../Components/Home.css"
import { toast } from 'react-toastify'
import axios from 'axios'

function Home() {
    const [data,setData] = useState([]);
    const localData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    }
    useEffect(()=>{
        localData();
    },[])

    const deleteContact=(id)=>{
        if(window.confirm("Are you sure to delete the contact?")){
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success('Deleted successfully');
            setTimeout(()=>{
                localData()
            },500);
        }
    }
  return (
    <div style={{marginTop: '150px'}}>
        <Link to="/addedit">
            <button className='btn btn-contact'>Add Contact</button>
        </Link>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign: 'center'}}>No.</th>
                    <th style={{textAlign: 'center'}}>Name</th>
                    <th style={{textAlign: 'center'}}>Email</th>
                    <th style={{textAlign: 'center'}}>Phone Number</th>
                    <th style={{textAlign: 'center'}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item,index)=>{
                        return (
                            <tr key={item.id}>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phn_num}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={()=>deleteContact(item.id)}>Delete</button>
                                    <Link to={`/view/${item.id}`}>
                                        <button className='btn btn-view'>View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Home