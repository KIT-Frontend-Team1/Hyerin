function job(state) {
  return new Promise(function (resolve, reject) {
    if (state) {
      resolve("success");
    } else {
      reject("error");
    }
  });
}
let promise = job(true);

promise
  .then(function (data) {
    console.log(data); //success
    return job(true); //resolve 반환
  })
  .then(function (data) {
    //success이다.
    if (data !== "victory") {
      //다르다.
      throw "Defeat"; //'Defeat'반환. 밑의 return문은 실행되지 않음
    }
    return job(true);
  })
  .then(function (data) {
    console.log(data); //Defeat 반환했으므로 패쓰
  })
  .catch(function (error) {
    console.log(error); //error는 'Defeat'값을 갖는다.'Defeat'출략
    return job(false); //'error'를 reject 반환
  })
  .then(function (data) {
    //reject되서 패쓰
    console.log(data);
    return job(true);
  })
  .catch(function (error) {
    //error라 실행됨
    console.log(error); //error 콘솔에 찍힘
    return "Error caught"; //Error caught라는 스트링 반환
  })
  .then(function (data) {
    console.log(data); //'Error caught'콘솔에 찍힘
    return new Error("test"); //
  })
  //error를 반환했다는 이유로 예외라고 생각하면 안된다. 그저 error 객체를 생상
  //한 것일 뿐 예외가발생한 것이 아니다.
  //따라서 Error생성자에 의해 생성된 객체를 데이터로 갖는 프로미스가 반환된다.
  .then(function (data) {
    console.log("Success:", data.message); //이거나오고종료
  })
  .catch(function (data) {
    console.log("Error : ", data.message);
  });
