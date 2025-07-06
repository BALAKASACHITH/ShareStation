import { Alert } from '@mui/material';
export default function Error({ msg,setMessage }) {
    setTimeout(()=>{
        setMessage("");
    },5000)
    return (
        <div className='Error'>
            {msg.length === 0 ? null : <Alert severity="error">{msg}</Alert>}
        </div>
    );
}
