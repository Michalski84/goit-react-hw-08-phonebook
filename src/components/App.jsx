import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact, selectAllContacts } from '../store/contactsSlice';
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

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container"> {/* Dodajemy klasę container */}
      <h1>Phonebook</h1>
      <form onSubmit={handleFormSubmit}>
        <input className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /> {/* Dodajemy klasę input */}
        <input className="input" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" /> {/* Dodajemy klasę input */}
        <button className="button" type="submit">Add Contact</button> {/* Dodajemy klasę button */}
      </form>
      <input className="input" type="text" value={filter} onChange={handleFilterChange} placeholder="Filter contacts" /> {/* Dodajemy klasę input */}
      <h2>Contacts</h2>
      <ul className="contacts-list"> {/* Dodajemy klasę contacts-list */}
        {filteredContacts.map((contact) => (
          <li key={contact.id} className="contact-item"> {/* Dodajemy klasę contact-item */}
            {contact.name} - {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
