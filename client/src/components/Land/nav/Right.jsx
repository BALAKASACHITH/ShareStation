import Button from '@mui/material/Button';
import {NavLink} from 'react-router-dom';
export default function Right(){
    const getNavClass = ({ isActive }) => `gradient-text option ${isActive ? 'activeoption' : 'inactiveoption'}`;
    return(
        <div className="Right">
            <NavLink to='/' className={getNavClass}><Button variant="contained" className='option gradient-text'>Home</Button></NavLink>
            <NavLink to='/About' className={getNavClass} ><Button variant="contained" className='option gradient-text'>About</Button></NavLink>
            <NavLink to='/Signin' className={getNavClass} ><Button variant="contained" className='option gradient-text'>Signin</Button></NavLink>
            <NavLink to='/Signup' className={getNavClass} ><Button variant="contained" className='option gradient-text'>Signup</Button></NavLink>
        </div>
    )
}