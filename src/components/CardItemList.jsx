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
    if (countSelectCard >= 2) {
      setPushSelectedCard([]);
    } else {
      setPushSelectedCard(
        cardList.filter((card) => card.isOpen && !card.isDisabled)
      );
    }
  }, [cardList]);
  useEffect(() => {
    if (pushSelectedCard.length > 1) {
      if (pushSelectedCard[0].name !== pushSelectedCard[1].name) {
        setTimeout(() => {
          setCardList(
            cardList.map((card) =>
              card.isOpen && card.isDisabled
                ? { ...card, isOpen: true }
                : { ...card, isOpen: false }
            )
          );
        }, 1000);
      } else {
        setCardList(
          cardList.map((card) => {
            if (
              card.name === pushSelectedCard[0].name ||
              card.name === pushSelectedCard[1].name
            ) {
              return { ...card, isOpen: true, isDisabled: true };
            }
            return { ...card };
          })
        );
      }
    }
  }, [pushSelectedCard]);

  const onClickHandler = (currentId) => {
    setCardList((prevCardState) => {
      return prevCardState.map((prevCard) => {
        return prevCard.id === currentId
          ? { ...prevCard, isOpen: true }
          : { ...prevCard, isOpen: prevCard.isOpen };
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
            isDisabled={item.isDisabled}
          ></CardItem>
        );
      })}
    </div>
  );
};
