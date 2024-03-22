import { useState } from "react";
import MTGCarousel from "./MTGCarousel";
import "./App.css";
import "./Styles/Index.css";
function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const [fuzzyResponse, setFuzzyResponse] = useState(``);
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const submitAPICALL = async (cardName: string) => {
    var response = await fetch(
      `https://api.scryfall.com/cards/search?q=%21"${cardName}"&unique=prints
      `
    );
    const maigicCardResponse = await response.json();
    setData(maigicCardResponse.data);
  };

  const clickFuzzyResponse = async (event: React.MouseEvent) => {
    event.preventDefault();
    setInvalidInput(false);
    setInputValue(fuzzyResponse);
    submitAPICALL(fuzzyResponse);
  };

  const initialSubmit = async () => {
    var response =
      await fetch(`https://api.scryfall.com/cards/search?q=%21"${inputValue}"&unique=prints
    `);
    if (response.ok) {
      const maigicCardResponse = await response.json();
      setData(maigicCardResponse.data);
      console.log(maigicCardResponse.data);
    } else {
      failedResponse();
    }
  };

  const failedResponse = async () => {
    var response = await fetch(
      `https://api.scryfall.com/cards/named?fuzzy=${inputValue}`
    );
    if (response.ok) {
      const dataAsJson = await response.json();
      setInvalidInput(true);
      setFuzzyResponse(dataAsJson.name);
    } else {
      if (fuzzyResponse !== ``) {
      }
      setFuzzyResponse(``);
      setInvalidInput(true);
    }
  };
  return (
    <>
      <div className="top-of-page">
        <p id="title">Enter a card name below!</p>
        <input
          placeholder="e.g Sol Ring"
          id="card-input"
          value={inputValue}
          onChange={handleInputChange}
        ></input>
        <button onClick={initialSubmit}>Submit</button>
      </div>
      {invalidInput && fuzzyResponse !== `` ? (
        <h3 id="fuzzyResponse">
          No results! Did you mean{" "}
          <a href="nice" onClick={(e) => clickFuzzyResponse(e)}>
            {fuzzyResponse}
          </a>
          ?
        </h3>
      ) : invalidInput ? (
        <p>Card not found!</p>
      ) : (
        ``
      )}
      <>
        <MTGCarousel cardArray={data} />
      </>
    </>
  );
}

export default App;
