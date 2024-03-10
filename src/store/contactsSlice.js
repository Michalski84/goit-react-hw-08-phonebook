// store/contactsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      const response = await fetch(
        'https://65ec8d110ddee626c9b080b4.mockapi.io/api/contacts'
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Błąd podczas pobierania danych z API:', error);
      throw error;
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async newContact => {
    try {
      const response = await fetch(
        'https://65ec8d110ddee626c9b080b4.mockapi.io/api/contacts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newContact),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Błąd podczas dodawania kontaktu:', error);
      throw error;
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      });
  },
});

export const selectAllContacts = state => state.contacts.contacts;

export default contactsSlice.reducer;
