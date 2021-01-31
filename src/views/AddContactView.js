import Container from '../components/Container/Container';
import Section from '../components/Section/Section';
import ContactForm from '../components/ContactForm/ContactForm';
// import { useSelector, useDispatch } from 'react-redux';

export default function ContactsView() {
  //   const error = useSelector(contactsSelectors.getError);

  return (
    <Container>
      <Section title="Phone book">
        <ContactForm />
      </Section>
    </Container>
  );
}
