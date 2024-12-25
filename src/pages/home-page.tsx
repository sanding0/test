import { useState } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import './home-page.css';
import { useNavigate } from 'react-router';


export function HomePage() {
  const [params, setParams] = useState<string>("");
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate(`/redirect?params=${params}`)
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        <div>
          <textarea
            cols={50}
            rows={10}
            value={params}
            onChange={(e) => setParams(e.target.value)}
          />
        </div>
        <button className="button" onClick={handleRedirect}>Do redirect</button>
      </div>
    </>
  );
}
