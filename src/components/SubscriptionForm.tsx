'use client';

import { useState } from 'react';

import styles from './subscription-form.module.scss';

function SubscriptionForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email: email,
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/form';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();

    alert(`Is this your email: ${result.email}`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['subscription-form']}>
      <label htmlFor="email">Email address</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        minLength={5}
        maxLength={30}
        placeholder="email@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Subscribe to monthly newsletter</button>
    </form>
  );
}

export default SubscriptionForm;
