import { blankCard as defaultImage } from "./../images";

export const CardItem = ({ isOpen, image, id, onClick, isDisabled }) => {
  const imagePath = isOpen ? image : defaultImage;
  return (
    <div
      className="card-item"
      onClick={!isDisabled ? () => onClick(id) : () => {}}
    >
      <img src={imagePath} alt="Image" />
    </div>
  );
};
