import * as S from "./Pagination.style";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 *
 * @param totalPage 총 페이지 개수
 * @param limit 몇 개씩 페이지네이션 ex. 10개씩 -> 1~10, 11~20
 * @param nowPage 현재 페이지 number
 * @param handlePage 페이지를 바꾸는 onClick 이벤트 함수
 */
const Pagination = ({
  shape = "pill",
  weight = "outlined",
  size = "small",
  space = "divided",
  totalPage,
  limit = 10,
  nowPage = 1,
  handlePage = (page) => null,
}) => {
  const NOWPAGE = nowPage > totalPage ? totalPage : nowPage;

  let startPage = Math.floor((NOWPAGE - 1) / limit) * limit + 1; // 시작 페이지 number. ex. 지금 14페이지라면 시작 페이지는 11입니다.
  let endPage = startPage + limit - 1; // 끝 페이지 번호. ex. 지금 14페이지라면 끝 페이지는 20입니다.
  if (endPage >= totalPage) endPage = totalPage; // 끝 페이지 번호 수정용. ex. 최종 마지막 페이지가 19라면 20이 끝 페이지가 아니라 19가 됩니다.
  if (startPage > endPage && endPage < totalPage) {
    startPage = endPage;
    endPage = startPage + limit - 1;
  }

  const createArray = (start, end) => {
    return Array(end - start + 1)
      .fill(0)
      .map((_, i) => start + i);
  };

  const isDisabled = (type) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case "start":
        return Math.floor((nowPage - 1) / limit) === 0;
      case "end":
        return Math.ceil(nowPage / limit) === Math.ceil(totalPage / limit);
    }
  };

  const arrow = {
    prev: <FontAwesomeIcon icon={faChevronLeft} />,
    next: <FontAwesomeIcon icon={faChevronRight} />,
  };

  console.log("now", NOWPAGE);

  return (
    <S.Wrapper>
      <S.Container shape={shape} weight={weight}>
        <S.PageBtn
          size={size}
          space={space}
          onClick={() => handlePage(Math.floor((nowPage - 1) / limit) * limit)}
          disabled={isDisabled("start")}
        >
          {arrow.prev}
        </S.PageBtn>
        {createArray(startPage, endPage).map((_, i) => (
          <S.PageBtn
            key={i}
            size={size}
            space={space}
            isThisPage={NOWPAGE === i + startPage}
            onClick={() => handlePage(i + startPage)}
          >
            {i + startPage}
          </S.PageBtn>
        ))}
        <S.PageBtn
          size={size}
          space={space}
          onClick={() => handlePage(Math.ceil(nowPage / limit) * limit + 1)}
          disabled={isDisabled("end")}
        >
          {arrow.next}
        </S.PageBtn>
      </S.Container>
    </S.Wrapper>
  );
};
export default Pagination;
