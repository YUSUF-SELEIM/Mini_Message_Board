import React from 'react';
import { useState } from 'react'
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://mini-message-board-orpin.vercel.app/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            author,
            message,
          }),
        }
      );

      if (response.status === 201) {
        console.log('Message saved successfully');
      } else {
        console.error('Failed to save message');
      }
    } catch (error) {
      console.error('Error saving message:', error);
    }
    setIsLoading(false);
  };
  return (

    <form onSubmit={handleSubmit} className='w-full flex items-center justify-center space-x-8' >
      <div className='flex flex-col space-y-4'>
        <Input
          type="text"
          color="secondary"
          label="Message"
          placeholder="my thoughts..."
          className="max-w-[220px]"
          onChange={(e) => setMessage(e.target.value)} required
        />
        <Input
          type="text"
          color="secondary"
          label="Author"
          placeholder="Yusuf"
          className="max-w-[220px]"
          onChange={(e) => setAuthor(e.target.value)} required
        />
      </div>
      <Button
        type="submit"
        value="submit"
        isLoading={isLoading}
        color="secondary"
        spinner={
          <svg
            className="animate-spin h-5 w-5 text-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
        }
      >
        Loading
      </Button>
    </form>

  )
}

export default Form;