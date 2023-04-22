/* 
문제 2

1. 
당신은 3가지 비동기 요청에 대하여 이 3가지 요청이 모두 실행되고 나서
console.log로 (정상적으로 실행되었습니다)라는 콘솔로그를 보여주려고 한다.

각각의 비동기 요청은
console.log("비동기 요청 1")
console.log("비동기 요청 2")
console.log("비동기 요청 3")
를 결과값으로 출력한다


2. 결과
[콘솔창]
      ... 비동기 요청

      1. case: success(fullfield)
      "비동기 요청 1"
      "비동기 요청 2"
      "비동기 요청 3"
      "정상적으로 실행되었습니다"

      2. case errer(rejected)
      "결과값을 가지고 오는데 실패하였습니다"


3. 조건
기초. 반복문 (for)을 사용하지말 것, resolve, reject의 반환 값으로 전달하는 데이터의 제한은 없다.
기초. 모든 요청 중 단 하나의 요청이라도 실패하면 "결과값을 가지고 오는데 실패하였습니다"를 출력 할 것

심화. 
      모든 요청 중 일부가 실패했다면 나머지 비동기 요청에 대해서는 정상적으로 console.log를 실행할 것
      만약 실패하였다면 어느 요청이 실패하였는지 consoe.log로 출력할 것

            ex) "비동기 요청 2 호출 실패"

      모든 요청에 대하여 일부요청이 실패하고 나머지는 정상적으로 작동되었기 때문에
      결과 값으로는 반드시 "정상적으로 실행되었습니다"가 출력되어야한다
      그러나, 3가지 요청이 모두 실패했을 때는 "결과값을 가지고 오는데 실패하였습니다"가 출력되어야한다.
*/

const promise1 = new Promise((resolve, reject) => {
  reject("비동기처리1 호출 실패");
});
const promise2 = new Promise((resolve, reject) => {
  //   resolve("비동기처리2");
  reject("비동기처리2 호출 실패");
});
const promise3 = new Promise((resolve, reject) => {
  reject("비동기처리3 호출 실패");
});

//1번

// const promiseAll = async () => {
//   try {
//     const result1 = await promise1;
//     console.log(result1);
//     const result2 = await promise2;
//     console.log(result2);
//     const result3 = await promise3;
//     console.log(result3);
//   } catch {
//     console.log(new Error("에러"));
//   }
// };
// promiseAll();

//2번
//하나하나씩 결과를 보여주기
promise1.then((res) => console.log(res)).catch((res) => console.log(res));
promise2.then((res) => console.log(res)).catch((res) => console.log(res));
promise3.then((res) => console.log(res)).catch((res) => console.log(res));

// promise1
//   .then((res) => {
//     console.log(res);
//     promise2.then((res) => {
//       console.log(res);
//       promise3.then((res) => console.log(res));
//     });
//   })
//   .catch((res) => console.log(res));

//하나라도 잘 시행되면 정상적으로 시행됨
//모두다 catch문으로 들어가면 실패 뜨기
