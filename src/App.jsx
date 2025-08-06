// src/App.jsx
import React, { useState } from 'react';
import Register from './pages/Register';
import HobbySelector from './pages/HobbySelector';

function App() {
    const [userId, setUserId] = useState(null);
    const [hobbiesSelected, setHobbiesSelected] = useState(false);

    return (
        <div>
            <h1>Welcome to HobbyHub</h1>
            {!userId ? (
                <Register onRegister={(id) => setUserId(id)} />
            ) : !hobbiesSelected ? (
                <HobbySelector
                    userId={userId}
                    onHobbiesSaved={() => setHobbiesSelected(true)}
                />
            ) : (
                <h2>✅ Hobbies Saved! (Next: Show Groups)</h2>
            )}
        </div>
    );
}

export default App;
