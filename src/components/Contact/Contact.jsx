import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteContact,
  updateContact,
  fetchContacts,
} from '../../redux/contacts/operations'; 
import { Modal, Button, TextField, Typography } from '@mui/material'; 
import { HiUser } from 'react-icons/hi'; 
import { BsFillTelephoneFill } from 'react-icons/bs'; 
import css from './Contact.module.css'; 
import toast from 'react-hot-toast'; 

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch(); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [editedName, setEditedName] = useState(name); 
  const [editedNumber, setEditedNumber] = useState(number); 

  
  const handleDelete = () => {
    dispatch(deleteContact(id)); 
    dispatch(fetchContacts()); 
    toast.error(`Contact ${name} deleted!`); 
    setIsDeleteModalOpen(false); 
  };

  
  const handleEditSubmit = () => {
    dispatch(updateContact({ id, name: editedName, number: editedNumber }))
      .then(() => {
        dispatch(fetchContacts()); 
        toast.success(`Contact ${editedName} updated!`); 
        setIsEditModalOpen(false); 
      })
      .catch(error => {
        toast.error(`Failed to update contact: ${error.message}`); 
      });
  };

  return (
    <div className={css.item}>
      <div className={css.datablock}>
        <p className={css.text}>
          <HiUser /> {name} 
        </p>
        <p className={css.text}>
          <BsFillTelephoneFill /> {number}{' '}
          
        </p>
      </div>
      <div className={css.buttonGroup}>
        
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit
        </Button>
        
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete
        </Button>
      </div>

      
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className={css.modal}>
          <Typography variant="h6">Edit Contact</Typography>
          <TextField
            label="Name"
            value={editedName}
            onChange={e => setEditedName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            value={editedNumber}
            onChange={e => setEditedNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
          <div className={css.buttonGroup}>
            <Button
              onClick={handleEditSubmit}
              variant="contained"
              color="primary"
            >
              Save Changes
            </Button>
            <Button
              onClick={() => setIsEditModalOpen(false)}
              variant="outlined"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className={css.modal}>
          <Typography variant="h6">
            Are you sure you want to delete this contact?
          </Typography>

          <div className={css.buttonGroup}>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="secondary"
            >
              Yes, Delete
            </Button>
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              variant="outlined"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;
