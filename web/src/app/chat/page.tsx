'use client';

import { Header } from '@/components/Header';
import { useEffect, useState } from 'react';

interface Message {
  user: string;
  text: string;
  action: string;
}

const Chat = () => {
  const [data, setData] = useState<Message[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/message', {
        method: 'POST',
      });

      const result: Message[] = await res.json();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main className='container mx-auto p-4'>
        <br />
        <h1>Chat</h1>
        <div>
          {data.map((message, index) => (
            <p key={index}>
              <strong>{message.user}:</strong> {message.text}
            </p>
          ))}
        </div>
      </main>
    </>
  );
};

export default Chat;
