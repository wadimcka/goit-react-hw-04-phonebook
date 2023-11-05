import { useState } from 'react';
import {
  FormBtn,
  FormContainer,
  FormInput,
  FormInputLabel,
} from './Form.styled';

export const Form = ({ onFormSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handlerFormInputChange = event => {
    console.log(event.target.value);
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const formSubmit = event => {
    event.preventDefault();
    onFormSubmit({ name, number });
    formReset();
  };

  const formReset = () => {
    setName('');
    setNumber('');
  };

  return (
    <FormContainer onSubmit={formSubmit}>
      <FormInputLabel> Name</FormInputLabel>
      <FormInput
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handlerFormInputChange}
      />
      <FormInputLabel> Number</FormInputLabel>
      <FormInput
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handlerFormInputChange}
      />
      <FormBtn type="submit">Add contact</FormBtn>
    </FormContainer>
  );
};
export default Form;
