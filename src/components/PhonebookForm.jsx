import { nanoid } from 'nanoid';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const {useState } = require('react');

const Form = styled.form`
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  width: 500px;
`;

export const PhonebookForm = ({onSubmit}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const options = {
    name: value => setName(value),
    number: value => setNumber(value),
  };

  const handleChange = ev => {
    const { name, value } = ev.currentTarget;
    options[name](value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  // считування інформації з інпуту і
  const handleSubmit = ev => {
    ev.preventDefault();
    // Перекидаємо в Арр
    const newContact = { id: nanoid(), name, number };
    onSubmit(newContact);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add contact</button>
    </Form>
  );
};


PhonebookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};