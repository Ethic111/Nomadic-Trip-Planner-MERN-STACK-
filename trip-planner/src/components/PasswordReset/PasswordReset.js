import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import "./PasswordReset.css"


export default function PasswordReset(){
    const [email, setEmail] = useState('');
    const [error, setError]= useState('')
    const { user,passwordreset } = UserAuth()
    const handlePasswordReset = async(e)=>{
        e.preventDefault();
        try{
          await passwordreset(email)
        }
        catch(e){
          setError(e.message)
        }
      }
    return(
        <>

        <form className='passwordResetForm' onSubmit={handlePasswordReset}>
            <div className='pwResetBox'>
            <h3>Email</h3>
                <p>Enter your Email to reset your password:</p>
                <input type="email" className='pwresetEmail' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                <br />
                <button type='submit' className='pwresetButton'>Reset Password</button>
            </div>
                
        </form>
        </>
    )
}