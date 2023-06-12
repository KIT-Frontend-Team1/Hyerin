//@연습용 코드 쓰지 않음 => apis => @core.js로 단일화

export const accessToken = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")
  : console.log("현재 토큰이 없습니다.");
console.log("현재토큰", accessToken);
