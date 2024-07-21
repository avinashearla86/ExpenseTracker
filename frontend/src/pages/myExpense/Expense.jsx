
import React from 'react'
import './expense.css'
import ExpenseData from './expenseData/ExpenseData'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ExpenseForm from './ExpenseForm/ExpenseForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    paddingTop: '2rem',
    boxSizing: 'border-box',
};

const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
};

function Expense() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='expense'>
            <button onClick={handleOpen}>Add Items</button>
            <ExpenseData/>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <button style={closeButtonStyle} onClick={handleClose}>x</button>
                    <ExpenseForm/>
                </Box>
            </Modal>
        </div>
    )
}

export default Expense