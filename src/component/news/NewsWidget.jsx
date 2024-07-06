import React, { useState, useEffect } from 'react';
import './NewsWidget.css';

const NewsWidget = () => {
  const [location, setLocation] = useState('');
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const apiKey = '07d3d694c52d44d49fee8797dc05ca53'; // Replace with your actual News API key

  useEffect(() => {
    const fetchNews = async () => {
      if (!location) return; // Ensure location is not empty
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${location}&apiKey=${apiKey}&pageSize=3`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch news data');
        }
        const data = await response.json();
        console.log(data);
        setNews(data.articles);
        setError(null); 
      } catch (err) {
        console.error('Error fetching news data:', err);
        setError('Failed to fetch news data. Please try again later.');
        setNews([]); // Clear previous news data if there's an error
      }
    };

    fetchNews();
  }, [location, apiKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setLocation(inputValue);
    }
  };

  return (
    <div className="news-widget">
      <h2>Top News from {location.toUpperCase()}</h2>
      <form onSubmit={handleSubmit} className="news-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter country code (eg: in,us,au)"
        />
        <button type="submit">Get News</button>
      </form>
      {error && <div className="error">{error}</div>}
      {news.length > 0 && (
        <div className="news-list">
          {news.map((article, index) => (
            <div key={index} className="news-item">
              <h3><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></h3>
              <p>{article.description}</p>
              <p>{article.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsWidget;
