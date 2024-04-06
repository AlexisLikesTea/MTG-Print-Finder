import { useEffect, useState } from "react";
import MTGCard from "./Components/MTGCard";
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
    <div className="button-div">
      {data.length > 0 && <SortingButtons sortingByDate={orderByDate} />}
      </div>
      <div key="container" className="container">
        {data ? (
          data.map((i: MagicCard) => (
            <div key={i.scryfallID} className="card">
              <MTGCard
                key={i.id}
                id={i.id}
                image_uris={i.image_uris}
                set_name={i.set_name}
                layout={i.layout}
                card_faces={i.card_faces}
              />
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
