import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';
import Loader from '../Loader/Loader';
import s from './ContactForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [adding, setAdding] = useState(false);

  const contacts = useSelector(contactsSelectors.getContacts);

  const loading = useSelector(contactsSelectors.getLoading);

  const contact = { name, number };

  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    setAdding(true);

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (contact.name === '') {
      toast.dark(`🦝 Enter name...`, { autoClose: 3000 });
      return;
    }

    if (contact.number === '') {
      toast.dark(`🦝 Enter number...`, { autoClose: 3000 });
      return;
    }

    contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase(),
    )
      ? toast.dark(`🦝 ${name} is already in contacts.`, { autoClose: 3000 })
      : dispatch(contactsOperations.addContact(contact));

    reset();
  };

  const reset = () => {
    setTimeout(() => {
      setName('');
      setNumber('');
    }, 0);

    setTimeout(() => {
      setAdding(false);
    }, 1000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={s.form}>
        <label className={s.item}>
          <p className={s.title}>Name</p>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter name here..."
            className={s.input}
          />
        </label>
        <label className={s.item}>
          <p className={s.title}>Number</p>
          <input
            type="text"
            name="number"
            value={number}
            onChange={handleChange}
            placeholder="Enter number here..."
            className={s.input}
          />
        </label>
        <button type="submit" className={s.button}>
          {loading && adding ? <Loader /> : 'Add contact'}
        </button>
      </form>
      <ToastContainer />
    </>
  );
}
