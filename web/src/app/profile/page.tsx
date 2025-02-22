'use client';

import { Header } from '@/components/Header';

const UserProfile = () =>
  <>
    <Header />
    <main className="container mx-auto p-4">
        <br />
        <h1>
          Hello, Anon 👋🏽
        </h1>
        <br />
        <p>
          This is your profile page. Here you can view and edit your profile information.
        </p>
    </main>
  </>

export default UserProfile;