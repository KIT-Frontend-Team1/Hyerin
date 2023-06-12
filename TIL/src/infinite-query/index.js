import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useCallback } from "react";

function InfinitePage() {
  const LIMIT = 10;
  const observerElem = useRef(null);

  //per_page는 고정, page는 parms에 따라 바뀌면서 해당 함수를 계속 호출함.
  const fetchRepositories = async (page) => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=topic:react&per_page=${LIMIT}&page=${page}`
    );
    return response.json();
  };

  //useInfiniteQuery에서 제공하는 기능들
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["repos"],
      ({ pageParam = 1 }) => fetchRepositories(pageParam),
      {
        //pageParam의 초기값은 1에서 시작하고, 그 다음값은 다음 로직에 따라 계속 바뀜
        //lastPage의 data가 있으면 nextPage를 부르고 아니면 안부름
        //nextPage는 allPage의 길이에서 1을 더한 값임.
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length + 1;
          return lastPage.items.length !== 0 ? nextPage : undefined;
        },
      }
    );

  //IntersectionObserver를 사용해 무한 스크롤 구현
  //들어오는 요소인 entries를 매개변수로 받음.
  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      //target.isIntersecting은 해당 요소가 뷰포트와 교차되었는지를 나타내는 불리언 값입니다.
      // hasNextPage가 true이고 target이 뷰포트와 교차되었다면,
      //fetchNextPage()를 호출하여 다음 페이지를 가져옵니다.
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    //observerElem.current는 useRef를 사용하여 생성한 참조 값입니다.
    //이 값은 IntersectionObserver에서 관찰할 요소를 지정하는 데 사용됩니다
    const element = observerElem.current;
    const option = { threshold: 0 };

    //const observer = new IntersectionObserver(callback, options);
    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [fetchNextPage, hasNextPage, handleObserver]);

  return (
    <div>
      {isSuccess &&
        data.pages.map((page) =>
          page.items.map((comment) => (
            <div className="result" key={comment.id}>
              <span>{comment.name}</span>
              <p>{comment.description}</p>
            </div>
          ))
        )}
      <div className="loader" ref={observerElem}>
        {isFetchingNextPage && hasNextPage ? "Loading..." : "No search left"}
      </div>
    </div>
  );
}
export default InfinitePage;
