memberList = ["문다은", "배상아", "윤국형", "윤진섭", "이지형", "이제율"];
memberMoney = {
  문다은: 49000,
  배상아: 194000,
  윤국현: 35000,
  윤진섭: 9000,
  이지형: 560000,
  이제율: 250000,
};
menu = {
  슈크림라떼: 6300,
  봄딸기라떼: 6900,
  핑크플라워티: 6100,
  바질셔벗블렌디드: 6500,
};

function isMember(name) {
  if (memberList.indexOf(name) !== -1) {
    console.log(`${name}회원님 환영합니다`);
  } else {
    console.log(`${name}님은 회원이 아닙니다`);
  }
}
//객체의 key값을 가져와서 하나씩 sum한다.
function order(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (menu[arr[i]] === undefined) {
      console.log(`${arr[i]}메뉴는 없습니다!`);
    } else {
      sum += menu[arr[i]];
    }
  }
  return sum;
}
console.log(order(["봄딸기라떼", "슈크림라떼", "코코넛라떼"]));

function moneyPay(obj) {
  let sum = 0;
  const sorted = Object.keys(obj).sort((a, b) => obj[b] - obj[a]);
  const people = sorted.slice(0, 2);
  sum = obj[people[0]] + obj[people[1]];
  return sum;
}
console.log(moneyPay(memberMoney)); //[ '윤진섭', '윤국현' ] //810000

function result(price, money) {
  console.log(`총 가격은 price이고, 거스름돈은 ${price - money}입니다`);
}
