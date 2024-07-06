import React from 'react';
import './App.css';
import WeatherWidget from './component/weather/WeatherWidget';
import NewsWidget from './component/news/NewsWidget';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Personal Dashboard</h1>
      </header>
      <main>
        <WeatherWidget />
        <NewsWidget />
      </main>
    </div>
  );
}

export default App;
