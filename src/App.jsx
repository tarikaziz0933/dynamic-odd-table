
import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setMatches(data));
  }, []);
  console.log(matches);

  return (
    <>

    </>
  )
}

export default App
