/* 
문제1.

1. 요구사항
    핸드폰 앱에 접속했을 때 슬라이드 패널은 미니멈 사이즈에서 사용자가 인식할 수 있도록 정확히 0.7초 후 맥시멈 사이즈로 바뀐다.
    또한, 맥시멈 사이즈로 변했을 때만 "이번 주 목표 달성까지 oo% 남았습니다"라는 텍스트가 눈에 보여야 한다.
    화면 검증에 들어가기전에 비동기 처리가 잘 이루어지는지 검증하기 위해 console.log를 활용하여 문제를 완성하여라


2. 결과
    [콘솔창]

    min size
    ... 0.7초 후
    max size
    이번주 목표까지 15% 남았습니다


3. 조건
    기초. promise를 사용하여 구현할 것
    심화. pomise의 then catch가 아닌 async await을 사용할 것
*/
let state = "min size";
console.log(state);

//changePromise를 프로미스 자체로 정의하면 then 실행시 바로 then을 쓰면 되고
//함수로 실행하면 then 실행전 changePromise()로 함수를 실행시켜야 한다
//그리고 new Promise 앞에 return을 적어 의도적으로 Promise를 반환해야 한다.

const changePromise =
  //리턴 써야지
  //프로미스의 콜백함수 resolve
  new Promise((resolve) => {
    //resolve는 setTimeout로 비동기 실행
    setTimeout(() => {
      state = "max size";
      resolve(state);
    }, 3000);
  });

//해당 then은 fulfilled가 되면 인자로 받은 함수가 실행된다.
changePromise.then((state) => {
  console.log(state);
  state === "max size" ? console.log("이번주 목표까지 15% 남았습니다") : "";
});

//프로미스는 마이크로 큐에 있어서 먼저 반환된다.
//처음에는 min size이다 .

let state2 = "min size";
const changePromise2 = () => {
  //프로미스의 콜백함수 resolve
  console.log(state2);
  //함수니까 리턴 써야지
  return new Promise((resolve) => {
    //resolve는 setTimeout로 비동기 실행
    setTimeout(() => {
      //3초뒤에 실행됨
      //state가 바뀌고 resolve를 반환함.
      state2 = "max size";
      resolve(state2);
    }, 3000);
  });
};

const print = async () => {
  //changePromise()함수가 반환한 promise의 객체상태가
  //resolve가 될때까지 대기
  //resolve가 되면 그 밑의 줄이 실행됨
  //resolve 반환
  await changePromise2();
  console.log(state2);
  state2 === "max size" ? console.log("이번주 목표까지 15% 남았습니다") : "";
};

print();
