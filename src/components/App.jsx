import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact, selectAllContacts, deleteContact } from '../store/contactsSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectAllContacts);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact({ name, phone }));
    setName('');
    setPhone('');
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <form className='inputGroup' onSubmit={handleFormSubmit}>
        <input className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input className="input" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
        <button className="button" type="submit">Add Contact</button>
      </form>
      <input className="input" type="text" value={filter} onChange={handleFilterChange} placeholder="Filter contacts" />
      <h2>Contacts</h2>
      <ul className="contacts-list">
        {filteredContacts.map((contact) => (
          <li key={contact.id} className="contact-item">
            {contact.name} - {contact.phone}
            <button className="button-delete" onClick={() => handleDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
