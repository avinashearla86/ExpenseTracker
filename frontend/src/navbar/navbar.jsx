import React from 'react'
import './navbar.css'
import { useUserStore } from '../store/userStore'
import {useNavigate} from 'react-router-dom'
function Navbar() {
    const {currentUser, logOut} = useUserStore()
    const navigate = useNavigate()
  return (
    <div className='navbar'>
        <div className="wrapper">
            <div className="logo">
                <img src="./budget.png" alt="logo" />
                <h2>ExpenseTracker</h2>
                <div className="pages">
                    <h3 onClick={()=>navigate('/')}>My Expenses</h3>
                    <h3 onClick={()=>navigate('/reports')}>Expense Records</h3>
                </div>
            </div>
            <div className="profile">
                <img src="./user.png" alt="icon" />
                <h3>{currentUser.username}</h3>
                <button onClick={logOut}>Log Out</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar