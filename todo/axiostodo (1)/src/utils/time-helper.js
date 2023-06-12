// 시간을 ~일 전으로 알려주는 컴포넌트
const TimeForToday = (value) => {
  //Date의 새로운 new 인스턴스 객체를 만든다.
  // console.log("시간", value);
  const today = new Date();
  const writeDate = new Date(value);
  // console.log("today", today);

  //Date 객체의 getTime()은 1970년 1월 1일로부터 경과한 밀리초를 반환한다.
  //1000으로 밀리초 => 초로 바꾸고 60으로 나누어 분으로 바꾸기
  const betweenTime = Math.floor(
    (today.getTime() - writeDate.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) {
    return "방금전";
  }
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }
  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }
  const betweenTimeDay = Math.floor(betweenTimeHour / 24);
  if (betweenTimeDay >= 1 && betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }
  return "오래됨";
};
export default TimeForToday;
