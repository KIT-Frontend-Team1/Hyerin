import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
function InfinitePage2() {
  const LIMIT = 10;

  //데이터 가져오는 함수
  const fetchRepositories = async (page) => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=topic:react&per_page=${LIMIT}&page=${page}`
    );
    return response.json();
  };

  //useInfiniteQurey를 이용해, data와 isSuccess(성공여부), hasNexPage(다음페이지 여부),
  //fetchNextPage(다음페이지 데이터받기)를 꺼내준다.
  const { data, isSuccess, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["repos"],
    ({ pageParam = 1 }) => fetchRepositories(pageParam),
    {
      //마지막페이지(lastPage)와 이전 모든 페이지 데이터(allPages)를 매개변수로 받고
      //다음 페이지를 결정하는 로직 구현
      //마지막 페이지에 items이 있을때만 nextpage를 구현하고 아니면 undefined
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.items.length !== 0 ? nextPage : undefined;
      },
    }
  );

  //스크롤이벤트로 현재 위치 알려주기
  useEffect(() => {
    //fetching상태는 false
    let fetching = false;
    const handleScroll = async (e) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <div>
      {isSuccess &&
        data &&
        data.pages.map((page) =>
          page.items.map((comment) => (
            <div className="result" key={comment.id}>
              <span>{comment.name}</span>
              <p>{comment.description}</p>
            </div>
          ))
        )}
    </div>
  );
}
export default InfinitePage2;
