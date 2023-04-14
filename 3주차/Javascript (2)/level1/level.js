import { BANK_LIST, ACCOUNT_FORM } from "./account.js";

// console.log(BANK_LIST);
// console.log(ACCOUNT_FORM);

//data의 은행이름 파싱
const $bankSelector = document.querySelector("#bank-selector");
//bankList의 key를 순회하면서 option이라는 요소를 만듦
for (const key in BANK_LIST) {
  const $option = document.createElement("option");
  //value로 키값을 주기. 이름은 bank_selector. bankList의 키의 값을 각각의
  //텍스트 노드로 추가함
  $option.value = key;
  $option.name = "bank_selector";
  $option.appendChild(document.createTextNode(`${BANK_LIST[key]}`));
  $bankSelector.appendChild($option);
}
//12자리 안되면 alert
const $accountInput = document.querySelector("#account-input");
const $submitBtn = document.querySelector("button");

//선택한 계좌 불러오기
//select가 change될떄마다 addEventListner로 가져오기
//select에 그대로 addEventListner넣어주면 됨!!!!!
let selectedBank; //???? //객체의 [0]번의 값으로 설정
$bankSelector.addEventListener("change", function () {
  selectedBank = $bankSelector.options[$bankSelector.selectedIndex].value;
  console.log(ACCOUNT_FORM[selectedBank]);
});

const $form = document.querySelector("#account-send-form");

//제출버튼 누르면 자리수 검사와 parse함수 실행
$form.addEventListener("submit", function (e) {
  if ($accountInput.value.length < 12) return alert("12자리를 입력하세요!");
  //12자리 검사후 새로고침 없애야 함
  e.preventDefault();
  parse($accountInput.value); //사과은행
});

// //선택한 은행양식대로 계좌 가리기 (막히는 부분)
//accountNumber는 계좌 번호 accountForm은 해당 은행의 형식
//앞뒤 2자리만 남기고 *로 바꾸고 나머지를 나타내야 함
function parse(accountNumbers) {
  console.log(accountNumbers); //1234556778
  let accountForm = ACCOUNT_FORM[selectedBank]; ///000-00000-0000
  console.log(accountForm);
  let newAccount = [];
  //accountForm을 '-'대로 split하기 [000,0000,0000]
  //개수 확인   [3,4,4]
  //accountNumber를 배열로 만들어
  //두 글자빼고 *로 고치기 [12**********12]
  //개수 대로 accountNumber 자르기 [12* -*****-*12]
  //-연결하기
  const accountArr = [...accountNumbers];
  for (let i = 2; i < accountArr.length - 2; i++) {
    accountArr[i] = "*";
  }
  console.log(accountArr);
  //form을 -으로 나눠지는 0의 개수를 숫자로 표현한것이 splitNumberArr
  console.log(accountForm);
  const splitNumberArr = [];
  for (let i = 0; i < accountForm.split("-").length; i++) {
    splitNumberArr.push(accountForm.split("-")[i].length);
  }
  //0의 개수대로 나눠진 accountNumber를 splitedArr라고 함.
  let splitedArr = [];
  let startIndex = 0;
  //splitNumberArr대로 원래 accountNumber를 숫자대로 나눠서 splitedArr에 집어넣음.
  //이를 다시 "-"join해서 최종 결과인 newAccount가 나옴.
  for (let i = 0; i < splitNumberArr.length; i++) {
    let endIndex = startIndex + splitNumberArr[i];
    let slicedArr = accountArr.slice(startIndex, endIndex);
    splitedArr.push(slicedArr.join(""));
    startIndex = endIndex;
  }
  newAccount = splitedArr.join("-");
  paint(newAccount);
}

//새로운 노드 만들어서 list에서 표시하기
function paint(number) {
  const $accountList = document.querySelector("#account-list");
  const $li = document.createElement("li");
  //은행이름 가져오기
  const BankName = BANK_LIST[selectedBank];
  $li.appendChild(document.createTextNode(BankName + " : " + number));
  $accountList.appendChild($li);
}
