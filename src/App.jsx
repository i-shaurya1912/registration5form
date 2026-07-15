import React from 'react';
import BackgroundGrid from './components/BackgroundGrid';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div className="relative min-h-[100dvh] w-full antialiased overflow-x-hidden lg:h-screen lg:overflow-hidden">
      {/* Immersive Space Grid Stars Background */}
      <BackgroundGrid />

      {/* Main Registration Experience */}
      <div className="relative z-10 w-full min-h-[100dvh] flex items-center justify-center lg:h-full">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default App;
