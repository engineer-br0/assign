import React, { useState } from 'react';

const Form = ({ addData }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [hobbies, setHobbies] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      name,
      phoneNumber,
      email,
      hobbies,
    };
    addData(newData);
    // Reset form fields
    setName('');
    setPhoneNumber('');
    setEmail('');
    setHobbies('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Hobbies"
        value={hobbies}
        onChange={(e) => setHobbies(e.target.value)}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default Form;
