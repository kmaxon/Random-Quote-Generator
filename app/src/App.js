import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import app from './App.css';


const quotes = [
  "The unexamined life is not worth living - Socrates", 
  "Whereof one cannot speak, thereof one must be silent - Ludwig Wittgenstein", 
  "Entities should not be multiplied unnecessarily - William of Ockham", 
  "The life of man (in a state of nature) is solitary, poor, nasty, brutish, and short - Thomas Hobbes", 
  "I think therefore I am - René Descartes", 
  "He who thinks great thoughts, often makes great errors - Martin Heidegger", 
  "We live in the best of all possible worlds - Gottfried Wilhelm Leibniz", 
  "What is rational is actual and what is actual is rational - G. W. F. Hegel", 
  "God is dead! He remains dead! And we have killed him. - Friedrich Nietzsche", 
  "There is but one truly serious philosophical problem, and that is suicide - Albert Camus", 
  "One cannot step twice in the same river - Heraclitus", 
  "The greatest happiness of the greatest number is the foundation of morals and legislation - Jeremy Bentham", 
  "To be is to be perceived (“Esse est percipi”) - Bishop George Berkeley", 
  "Happiness is not an ideal of reason but of imagination - Immanuel Kant", 
  "No man's knowledge here can go beyond his experience - John Locke"
];

const colors = [
  '#00FFFF',
  '#BB00FF',
  '#FFFF33',
  '#80002A',
  '#40FF19',
  '#FF8000'
];

function GetRandomQuote() {
  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  let quoteAndAuthor = randomQuote.split("-");
  return ({
    currentQuote: quoteAndAuthor[0].trim(), 
    currentAuthor: quoteAndAuthor[1].trim()
  });
};

function GetColor() {
  return (colors[Math.floor(Math.random() * colors.length)])
};

function DisplayQuote(props) {
  const quotationMarks = "\"";

  const quoteStyle = {
    fontFamily: "Georgia, serif",
    fontStyle: "italic",
    fontSize: "3rem",
    lineHeight: "1.2",
    textAlign: "center",
    padding: "1rem"
  };

  return (
    <h1 style={quoteStyle}>
      {quotationMarks + props.quote.currentQuote + quotationMarks}
    </h1>
  );
};

function DisplayAuthor(props) {

  const authorStyle = {
    fontFamily: "Helvetica Neue, sans-serif",
    fontWeight: "bold",
    fontSize: "1.5rem",
    textAlign: "right",
    padding: "1rem"
  };

  return (
    <h2 style={authorStyle}>
      {"- " + props.author.currentAuthor}
    </h2>
  );
};

function App() {
  const [quoteObj, setQuoteObj] = React.useState(GetRandomQuote());
  const [color, setColor] = React.useState(GetColor());

  function ClickHandler() {
    setColor(GetColor);
    setQuoteObj(GetRandomQuote());
  };

  const tweetText = `"${quoteObj.currentQuote}" - ${quoteObj.currentAuthor}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  const appStyle = {
    backgroundColor: color,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 1s ease"
  };

  const quoteBoxStyle = {
    backgroundColor: "white",
    color: color,
    height: "auto",
    width: "50vw",
    paddingBottom: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "5px",
    transition: "color 1s ease"
  };

  const buttonStyle = {
    backgroundColor: color,
    border: "0px",
    color: "white",
    fontSize: "1.2rem",
    padding: "5px",
    borderRadius: "5px",
    transition: "background-color 1s ease"
  };

  const twitterLinkStyle = {
    backgroundColor: color,
    color: "white",
    fontSize: "25px",
    padding: "6px 5px 2px 5px",
    margin: "0px 300px 0px 0px",
    borderRadius: "5px",
    transition: "background-color 1s ease"
  };

  return (
    <div id="app" style={appStyle}>
      <div id="quote-box" style={quoteBoxStyle}>
        <div id="text">
          <DisplayQuote quote={quoteObj} />
        </div>
        <div id="author">
          <DisplayAuthor author={quoteObj} />
        </div>
        <div>
        <a id="tweet-quote" style={twitterLinkStyle} href={tweetUrl} target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <button id="new-quote" style={buttonStyle} onClick={ClickHandler}>New Quote</button>
        </div>
      </div>
    </div>
  );
};


export default App;
