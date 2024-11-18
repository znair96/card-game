import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useEffect, useState } from "react";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [countSelectCard, setSelectCardCount] = useState(0);
  const [pushSelectedCard, setPushSelectedCard] = useState([]);

  useEffect(() => {
    setSelectCardCount((prevCardCount) => {
      if (prevCardCount === 2) {
        return 0;
      }
      return prevCardCount + 1;
    });
    console.log(cardList);
  }, [cardList]);

  const onClickHandler = (currentId) => {
    setCardList((prevCardState) => {
      return prevCardState.map((prevCard) => {
        if (countSelectCard >= 2) {
          return { ...prevCard, isOpen: false };
        } else {
          return prevCard.id === currentId
            ? { ...prevCard, isOpen: true }
            : { ...prevCard, isOpen: prevCard.isOpen };
        }
      });
    });
  };

  return (
    <div className="card-item-list">
      {cardList.map((item) => {
        return (
          <CardItem
            key={item.id}
            id={item.id}
            image={item.pic}
            onClick={() => onClickHandler(item.id)}
            isOpen={item.isOpen}
          ></CardItem>
        );
      })}
    </div>
  );
};
