const user = {
  name: "김성용",
  age: 20,
  height: 190,
};

// 문제1. 위의 객체를 아래의 메소드를 이용하여 반환 값을 출력 하고 각 메소드의 기능을 정의할 것

//(1) user[”key”], user.key
//키에 해당하는 value를 보여줌
console.log(user["age"]);
console.log(user.height);

//(2) Object.keys()
//객체의 keys를 배열로 반환
console.log(Object.keys(user)); //['name','age','height']

//(3) Object.values()
//객체의 values를 배열로 반환
console.log(Object.values(user)); //['김성용',20,190]

//(4) Object.entries()
//객체의 key와 value를 묶은 배열을 인자로 한 배열을 반환
console.log(Object.entries(user)); //[ [ 'name', '김성용' ], [ 'age', 20 ], [ 'height', 190 ] ]

//(5) for in
for (const key in user) {
  console.log(key, user[key]);
}
//name 김성용 age 20 height 190

// 문제2. 값이 “김성용”인 속성의 key 찾기
for (const key in user) {
  if (user[key] === "김성용") {
    console.log(key);
  }
}

// 문제3. 깊은 복사를 통해 user 객체의 복사본을 만든 후 name을 본인의 이름으로 수정
let copy = { ...user };
copy.name = "오혜린";
console.log(copy);
