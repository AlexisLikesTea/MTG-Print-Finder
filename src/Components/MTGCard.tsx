import { UrlObject } from "../Types/types";
import { useState } from "react";
import "../Styles/MTGCarousel.css";

interface MTGCardProps {
  id: number;
  set_name: string;
  image_uris: UrlObject;
  card_faces?: MTGCardProps[];
  layout: string;
}

function MTGCard({ set_name, image_uris, card_faces, layout }: MTGCardProps) {
  const [flipped, setFliped] = useState(false);

  const onClick = () => {
    setFliped(!flipped);
  };
  return (
    <>
      {card_faces !== undefined &&
      layout !== "adventure" &&
      layout !== "split" ? (
        <div>
          <button className="flip-button" onClick={onClick}>
            Flip card
          </button>
          <img
            className="card-img"
            src={
              flipped
                ? card_faces[1].image_uris?.large
                : card_faces[0].image_uris?.large
            }
          ></img>
        </div>
      ) : (
        <img className="card-img" src={image_uris?.large}></img>
      )}
      <p className="card-text">
        <strong>Set: </strong> {set_name}
      </p>
    </>
  );
}

export default MTGCard;
