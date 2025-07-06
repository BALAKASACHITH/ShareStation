import TextField from '@mui/material/TextField';
export default function Input({ label, value, change, type = "text" }) {
    return (
        <TextField 
            type={type}
            label={label} 
            value={value}
            variant="outlined" 
            className='TextField'
            onChange={(e) => change(e.target.value)}
        />
    );
}
