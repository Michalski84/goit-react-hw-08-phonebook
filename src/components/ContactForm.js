import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    this.props.onAddContact(name, number);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            title="Name may contain only letters, apostrophe, dash, and spaces."
            required
          />
        </label>

        <label>
          Number:
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChange}
            pattern="\d*"
            title="Phone number must be digits"
            required
          />
        </label>

        <button type="submit">Add Contact</button>
      </form>
    );
  }
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };
}

export default ContactForm;
