import { Filter } from './Filter';
import { PhonebookForm } from './PhonebookForm';
import { ContactList } from './contactList';
import Swal from 'sweetalert2';

import { useEffect, useState } from 'react';

export const App = () => {

  const findStorageContacts = () => {
    const storageContacts = JSON.parse(localStorage.getItem('contacts'));
    return storageContacts || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  }; 

  const [contacts, setContacts] = useState(findStorageContacts());
  const [filter, setFilter] = useState('');

  const addContact = dataContact => {
    if (
      contacts.some(
        contact =>
          contact.name.toLowerCase() === dataContact.name.toLowerCase() ||
          contact.number === dataContact.number
      )
    ) {
      Swal.fire(
        `${dataContact.name} or ${dataContact.number} is already in contacts.`
      );
      return;
    }
    
    setContacts(prevContacts => (
      [dataContact,
      ...prevContacts]
    ));
  };

  const changeFilter = ev => {
    setFilter(ev.currentTarget.value);
  };

  // Видалення контакту
  const onDelateContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };
  // метод фільтрації контактів

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  
  // // Визначення зміни в даних і запис в сховище
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = getVisibleContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <PhonebookForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        dataContacts={visibleContacts}
        onDelateContact={onDelateContact}
      />
    </div>
  );
};


