import { RESERVATION_LIST } from "./reservation .js";
console.log(RESERVATION_LIST);
const $userName = document.querySelector('input[name="user-name"]');
const $userPhone = document.querySelector('input[name="user-phone"]');
const $submitBtn = document.querySelector("button");
const $reservationList = document.querySelector("#reservation-number");

//제출버튼을 클릭하면 findName함수가 실행
$submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  findName($userName.value);
});

//findName함수는 name을 받아서 name이 일치하는 객체를 nameArr에 담아서 반환함.
//그후 그 배열을 findPhoneNumber의 인자로 보내서 실행함.
function findName(name) {
  const nameArr = RESERVATION_LIST.filter((user) => {
    //return문 쓰라고 바보야
    return user["name"] === name;
  });
  findPhoneNumber(nameArr);
}

//findPhoneNumber는 배열을 받아서 해당 배열에서 입력한 핸드폰 번호가 있는지 확인함.
//번호가 일치하면 일치하는 객체를 findUser로 반환함.
//입력한 번호를 번호 형식으로 바꿔주는 phoneNumFunc를 실행함.
//findUser가 없으면 alert로 리턴함
//findUser가 있으면 print함수로 넘겨줌
function findPhoneNumber(arr) {
  console.log(arr);
  const findUser = arr.find((user) => {
    //화살표문 2줄이상이면 리턴문 쓰라고
    return (
      user.phone === $userPhone.value ||
      user.phone === phoneNumFunc($userPhone.value)
    );
  });
  if (!findUser) return alert("정보가 없습니다");
  console.log(findUser);
  print(findUser);
}

//입력한 핸드폰 번호를 핸드폰 번호 형식으로 바꿔주는 함수
//핸폰 번호 형태 변환 000-0000-0000
function phoneNumFunc(number) {
  let newPhoneNumber;
  //splitNumberArr는 -으로 나눠질 번호의 숫자. 각각 3,4,4
  //splitedArr는 splitNumberArr의 개수대로 나눠진 숫자들이 들어갈 arr
  let splitNumberArr = [3, 4, 4];
  let splitedArr = [];
  let startIndex = 0;
  for (let i = 0; i < splitNumberArr.length; i++) {
    let endIndex = startIndex + splitNumberArr[i];
    let slicedArr = number.slice(startIndex, endIndex);
    splitedArr.push(slicedArr);
    startIndex = endIndex;
  }
  //이를 다시 "-"join해서 최종 결과인 newPhoneNumber가 나옴.
  newPhoneNumber = splitedArr.join("-");
  return newPhoneNumber;
}

//print는 찾은 예약번호를 프린트 해주는 함수
//textNode에 추가할때 변수명은 ${}로 감싸주는 것 잊지 말것
function print(findUser) {
  const newList = document.createElement("p");
  newList.appendChild(document.createTextNode(`${findUser.number}`));
  $reservationList.appendChild(newList);
}
