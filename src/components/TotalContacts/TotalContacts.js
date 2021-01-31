import s from './TotalContacts.module.css';
import { contactsSelectors } from '../../redux/contacts';
import { useSelector } from 'react-redux';

export default function TotalContacts() {
  const contacts = useSelector(contactsSelectors.getContacts);

  return (
    <div className={s.totalContacts}>
      Contacts in phonebook: <span className={s.total}>{contacts.length}</span>
    </div>
  );
}
