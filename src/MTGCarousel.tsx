import { useEffect, useState } from "react";
import { MagicCard } from "./Types/types";
import "./Styles/MTGCarousel.css";
import SortingButtons from "./Components/SortingButtons";
interface MTGCarouselProps {
  cardArray: MagicCard[];
}

function MTGCarousel(props: MTGCarouselProps) {
  const [data, setData] = useState(props.cardArray as MagicCard[]);

  useEffect(() => {
    setData(props.cardArray);
  }, [props.cardArray]);

  function orderByDate(direction: string) {
    const orderedData = [...data].sort((a, b) => {
      const dateA = parseInt(a.released_at.toString());
      const dateB = parseInt(b.released_at.toString());
      if (direction === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    setData(orderedData);
  }

  return (
    <>
      {data.length > 0 && <SortingButtons sortingByDate={orderByDate} />}
      <div key="container" className="container">
        {data ? (
          data.map((i: MagicCard) => (
            <div id={i.id.toString()} key={i.scryfallID} className="card">
              {i.card_faces && i.layout != "adventure" ? (
                <img
                  className="card-img"
                  src={i.card_faces[0].image_uris.large}
                  alt="Card image cap"
                />
              ) : (
                <img
                  className="card-img"
                  src={i.image_uris.large}
                  alt="Card image cap"
                />
              )}

              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">
                  <strong>Set: </strong>
                  {i.set_name}
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>No data found</h1>
        )}
      </div>
    </>
  );
}

export default MTGCarousel;
