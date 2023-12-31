'use client';

import { useState } from 'react';
import Image from 'next/image';

import styles from './subscription-form.module.scss';

// Type for the received data
interface Data {
  email: string;
}

function SubscriptionForm() {
  // Inputs handling
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  // Received data
  const [data, setData] = useState<Data | null>(null);

  // Form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Email validation
    if (!email) {
      setEmailError('Email cannot be empty');
      return;
    }
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Send data
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

    // Receive response (server validation)
    try {
      const response = await fetch(endpoint, options);

      if (!response.ok) {
        setEmailError(`HTTP error! status: ${response.status}`);
        return;
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setEmailError('Something went wrong');
      return;
    }
  };

  // Handle inputs change
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(null);
    setEmail(event.target.value);
  };

  // Dismiss action after success
  const handleDismiss = () => {
    setData(null);
  };

  // Success state (if data received successfully)
  if (data && data.email) {
    return (
      <div className={`${styles['container-wrapper']}`}>
        <div className={`${styles['container']} ${styles['success']}`}>
          <div className={`${styles['content']} flow`}>
            <div className={`${styles['main-content']} flow`}>
              <Image
                src="/icon-success.svg"
                alt="Thanks for subscribing!"
                width={64}
                height={64}
              />
              <h2>Thanks for subscribing!</h2>
              <p>
                A confirmation email has hen sent to{' '}
                <strong>{data.email}</strong>. Please open It and click the
                button inside to confirm your subscription.
              </p>
            </div>
            <button onClick={handleDismiss} className={styles['btn-form']}>
              Dismiss message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['container-wrapper']}>
      <div className={styles['img-mobile']}>
        <Image
          src="/illustration-sign-up-mobile.svg"
          alt="Stay updated!"
          fill={true}
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
        />
      </div>
      <div className={`${styles['container']}`}>
        <div className={`${styles['info-col']} flow`}>
          <div className={`${styles['content']} flow`}>
            <div className={`${styles['main-content']} flow`}>
              <h2>Stay updated!</h2>{' '}
              {/* can be changed to H1 if it's the main component on the page */}
              <p>Join 60,000+ product managers receiving monthly updates on:</p>
              <ul role="list" className={`${styles['list']} flow`}>
                <li>Product discovery and building what matters</li>
                <li>Measuring to ensure updates are a success</li>
                <li>And much morel</li>
              </ul>
            </div>
            <form
              onSubmit={handleSubmit}
              className={`${styles['subscription-form']}`}
            >
              <div className={styles['label-wrapper']}>
                <label htmlFor="email" className={styles['label-form']}>
                  Email address
                </label>
                {emailError && (
                  <span className={styles['label-error']}>{emailError}</span>
                )}
              </div>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="email@company.com"
                value={email}
                onChange={handleEmailChange}
                className={`${styles['input-form']} ${
                  emailError ? styles['has-error'] : ''
                }`}
              />
              <button
                type="submit"
                className={styles['btn-form']}
                disabled={!!emailError}
              >
                Subscribe to monthly newsletter
              </button>
            </form>
          </div>
        </div>
        <div className={styles['img-col']}>
          <Image
            src="/illustration-sign-up-desktop.svg"
            alt="Stay updated!"
            fill={true}
            style={{ objectFit: 'cover', objectPosition: 'right center' }}
          />
        </div>
      </div>
    </div>
  );
}

export default SubscriptionForm;
