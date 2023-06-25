'use client';

import { useState } from 'react';

import styles from './subscription-form.module.scss';

interface Data {
  email: string;
}

function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [data, setData] = useState<Data | null>(null);

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

    setData(result);
  };

  if (data) {
    return <div className={styles['container']}>Thank you, {data.email}!</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles['container']}>
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
