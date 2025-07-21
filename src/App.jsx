
import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setMatches(data));
  }, []);

  return (
    <>

    </>
  )
}

export default App
