import React,{useState,useEffect} from 'react'
import {useNavigate,useParams, Link} from 'react-router-dom'
import axios from 'axios'
import {toast } from 'react-toastify'
import '../Components/AddEdit.css'

const intialState = {
    name: "",
    email: "",
    phn_num: ""
}

function AddEdit() {
    const [state,setState] = useState(intialState);
    const history = useNavigate();
    const {name,email,phn_num} = state;

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then((resp)=> setState({...resp.data[0]}))
    },[id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !phn_num){
            toast.error("Please provide value into each field");
        }
        else{ 
            if(!id){
            axios.post("http://localhost:5000/api/post",{
                name,email,phn_num
            }).then(()=>{
                setState({name:"",email:"",phn_num:""})
            }).catch((err)=> toast.error(err.response.data));
            toast.success("Contact added successfully");
            setTimeout(()=>{
                history('/');
            },500)
            }
            else{
                axios.put(`http://localhost:5000/api/put/${id}`,{
                name,email,phn_num
            }).then(()=>{
                setState({name:"",email:"",phn_num:""})
            }).catch((err)=> toast.error(err.response.data));
            toast.success("Contact updated successfully");
            setTimeout(()=>{
                history('/');
            },500)
            }
        }
    }

    // const handleInputChange = (e) => {
    //     const {name,value} = e.target;
    //     setState({...state,[name]: value})
    // }
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };
    
    useEffect(() => {
        // This effect will run after each state update
        console.log(state);
    }, [state]);
    
    
  return (
    <div style={{marginTop: '100px'}}>
        <form style={{
            margin: 'auto',
            padding: '15px',
            maxWidth: '400px',
            alignContent: 'center'
        }} onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' placeholder='Your Name....' value={name || ""} onChange={handleInputChange}/>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='Your Email....' value={email || ""} onChange={handleInputChange}/>
            <label htmlFor='phn_num'>Contact</label>
            <input type='text' id='phn_num' name='phn_num' placeholder='Your Contact No....' value={phn_num || ""} onChange={handleInputChange}/>
            <input type='submit' value={id ? "Update" : "Save"} /><br></br>
            <Link to="/">
                <input type='button' value='Back' />
            </Link>
        </form>
    </div>
  )
}

export default AddEdit