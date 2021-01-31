import s from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { contactsActions, contactsSelectors } from '../../redux/contacts';

export default function Filter() {
  const value = useSelector(contactsSelectors.getFilter);
  const dispatch = useDispatch();

  return (
    <label className={s.filter}>
      <p className={s.title}>Find contacts by name</p>
      <input
        type="text"
        value={value}
        onChange={e => dispatch(contactsActions.changeFilter(e.target.value))}
        placeholder="Enter name here..."
        className={s.input}
      />
    </label>
  );
}
