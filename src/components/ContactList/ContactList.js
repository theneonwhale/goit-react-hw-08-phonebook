import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import ContactItem from './ContactItem';
import { useSelector } from 'react-redux';
import { contactsSelectors } from '../../redux/contacts';

export default function ContactList() {
  const contacts = useSelector(contactsSelectors.getVisibleContacts);

  return (
    <ul className={s.contacts}>
      {contacts.map(({ name = 'anonymous', number = 'unknown', id = null }) => (
        <ContactItem key={id} name={name} number={number} id={id} />
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ),
};
