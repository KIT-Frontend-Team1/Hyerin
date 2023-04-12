const bestProducts = [
  {
    id: 1,
    name: "[피코크]피코크 떡갈비 450g x6팩 (신세계푸드 중복쿠폰 할인)",
    price: 45000,
    discount: {
      percent: 0.01,
    },
    delivery: {
      smileDelivery: true,
      freeDelivery: true,
    },
  },
  {
    id: 2,
    name: "[노르딕내추럴](오플닷컴) 2개 프로 오메가3 1280 mg 650 EPA 450 DHA 레몬",
    price: 110500,
    discount: false,
    delivery: {
      smileDelivery: false,
      freeDelivery: true,
    },
  },
  {
    id: 3,
    name: "[고등어밥상]가시제거연구소 본사운영 오렌지라벨 800g + 800g 고등어밥상 순살",
    price: 35600,
    discount: {
      percent: 0.3,
    },
    delivery: {
      smileDelivery: false,
      freeDelivery: true,
    },
  },
  {
    id: 4,
    name: "[스파클]스파클생수 2L 30병 무라벨생수",
    price: 24100,
    discount: {
      percent: 0.29,
    },
    delivery: {
      smileDelivery: false,
      freeDelivery: true,
    },
  },
  {
    id: 5,
    name: "[동원참치]동원 라이트 스탠다드 참치 150g 원터치 10개",
    price: 24900,
    discount: {
      percent: 0.08,
    },
    delivery: {
      smileDelivery: true,
      freeDelivery: false,
    },
  },
  {
    id: 6,
    name: "[스타벅스]스타벅스 캡슐커피 by 네스프레소 9박스(90캡슐/콜라담기)",
    price: 56430,
    discount: {
      percent: 0.08,
    },
    delivery: {
      smileDelivery: false,
      freeDelivery: true,
    },
  },
  {
    id: 7,
    name: "[프레시누리]프리미엄 우삼겹(3초구이샤브) 250gX4팩",
    price: 19900,
    discount: {
      percent: 0.29,
    },
    delivery: {
      smileDelivery: false,
      freeDelivery: true,
    },
  },
  {
    id: 8,
    name: "[스파클]스파클생수 500ml 100병 무라벨생수",
    price: 28400,
    discount: {
      percent: 0.29,
    },
    delivery: {
      smileDelivery: false,
      freeDelivery: true,
    },
  },
];

// 1번 [데이터 추가문제]
// 1. 해당 데이터를 추가하세요
// 추가한 데이터는 id: 5라는 데이터를 넣어 추가하세요
// 그 뒤의 데이터들은 다음으로 밀려납니다
const newItem = {
  id: 0,
  name: "[비비고]비비고 왕교자 1.05kg 3개",
  price: 32900,
  discount: {
    percent: 0.1,
  },
  delivery: {
    smileDelivery: false,
    freeDelivery: true,
  },
};

newItem["id"] = 5;
bestProducts.forEach((item) => {
  if (item.id >= newItem.id) {
    item.id += 1;
  } else {
  }
});
bestProducts.push(newItem);
bestProducts.sort((a, b) => a.id - b.id);
console.log(bestProducts);

//2번 [데이터 삭제문제]
//1번에서 추가한 왕교자 제품을 삭제하세요
//그 뒤에 id를 재정렬하세요
//forEach와 index를 사용해서 정렬하세요(새로운 id를 주세요)
const newArr = bestProducts.filter((item) => !item.name.includes("왕교자"));
newArr.forEach((item, index) => {
  item.id = index + 1;
});
console.log(newArr);

//3번 [데이터 조회문제]
//스파클 생수 제품들(2개)을 Sparkle이라는 변수로 조회해 주세요
//filter사용
const Sparkle = bestProducts.filter((item) => item.name.includes("스파클생수"));
console.log(Sparkle);

//4번 [데이터 수정문제]
//4. 떡갈비 제품이 행사로 할인률을 30%로 늘렸다고 합니다.
//데이터를 수정해 주세요!
//(name을 다 작성하지 말고 include로 객체를 불러오세요) //filter
let 떡갈비 = bestProducts.find((e) => e.name.includes("떡갈비"));
떡갈비.discount.percent = 0.3;
console.log(bestProducts);
