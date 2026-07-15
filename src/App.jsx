import React from 'react';
import BackgroundGrid from './components/BackgroundGrid';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div className="relative min-h-screen w-full antialiased overflow-x-hidden">
      {/* Immersive Space Grid Stars Background */}
      <BackgroundGrid />

      {/* Main Registration Experience */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default App;
