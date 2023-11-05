import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/Form';
import { Section } from './Section/Section';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const LS_KEY = 'saved_contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem(LS_KEY)) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    setContacts(contacts);
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const handlerFilterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    if (contacts)
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
  };

  const handlerDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContact = getFilteredContacts();

  return (
    <>
      <Section title="Phonebook">
        <Form onFormSubmit={addContact} />
      </Section>

      <Section>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handlerFilterChange} />
        <ContactList
          contacts={filteredContact}
          handlerDeleteContact={handlerDeleteContact}
        />
      </Section>
    </>
  );
};

export default App;
