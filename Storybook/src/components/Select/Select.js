import * as S from "./Select.style";
import { useState } from "react";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Select = ({
  options,
  selectedValue = "",
  onClick,
  color = "",
  isBorder = true,
  ...rest
}) => {
  const [isOpenSlide, setIsOpenSlide] = useState(false);

  const handleSlide = () => {
    setIsOpenSlide((prev) => !prev);
  };

  return (
    <S.Wrapper onClick={handleSlide}>
      <S.BoxContainer color={color} isBorder={isBorder}>
        <span>{options[selectedValue].title}</span>
        <FontAwesomeIcon
          icon={faAngleDown}
          rotation={isOpenSlide ? 180 : undefined}
        />
      </S.BoxContainer>
      {isOpenSlide && (
        <S.SelectContainer>
          {Object.entries(options).map(([key, value]) => (
            <S.SelectItem
              key={key}
              onClick={() => onClick(key)}
              state={selectedValue === key}
              className="li"
            >
              {value.title}
            </S.SelectItem>
          ))}
        </S.SelectContainer>
      )}
    </S.Wrapper>
  );
};
export default Select;
