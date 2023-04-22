const users = [
  {
    id: 1,
    name: "김성용",
    age: 20,
    height: 190,
  },
  {
    id: 2,
    name: "이수박",
    age: 32,
    height: 205,
  },
  {
    id: 3,
    name: "오렌지",
    age: 20,
    height: 180,
  },
  {
    id: 4,
    name: "이멜론",
    age: 28,
    height: 175,
  },
];

//1.유저 추가하기
const newUser = {
  id: 0,
  name: "금사과",
  age: 24,
  height: 160,
};
newUser.id = users.length + 1;
users.push(newUser);

//2. 유저 삭제하기
//splice를 사용하여 users라는 객체에서 원본 변경
//리턴쓰세요^^
const deleteUser = users.find((user) => {
  return user.name == "오렌지";
});
users.splice(users.indexOf(deleteUser), 1);
// console.log(users);

//3. 유저 수정하기
//아이디가 1인 사람을 10살로 바꾸기
const fixUser = users.find((user) => {
  return user.id === 1;
});
fixUser.age = 10;
// console.log(users);

//5. 키 순서대로 오름차순 정렬
//리턴!!
users.sort((a, b) => {
  return b.height - a.height;
});
console.log(users);

//6. index재정렬
users.forEach((user, index) => {
  return (user.id = index + 1);
});
console.log(users);

/* 
CRUD 구현하기
배열의 고차함수

문제1. 유저 추가하기
  내가 추가하고자 하는 유저를 추가해야합니다
  단 id는 고유 번호로 반드시 순서대로일 필요는 없지만, 어떠한 경우에도 겹쳐서 안됩니다

문제2. 유저 삭제하기
  내가 원하는 유저를 삭제할 수 있어야합니다.
  단, 동일한 유저의 이름이 있더라도 정확히 원하는 유저여야합니다.

문제3. 유저 수정하기
  내가 수정하고자 하는 유저의 개인정보를 수정해야합니다.

문제4. 유저 조회하기
  위의 모든 상황이 적용된 결과를을 콘솔창에 띄울 것
  단 위의 수정 내용은 모두 적용된 상태여야 한다.

문제5. 조회한 유저를 height별 오름 차순으로 정렬하여 조회하기
*/
