/*
학원 가는 길
2호선을 타고 이동하는 학생이 역삼역에 도착했을 때 얼마를 지불하게 될 지 구해보세요.
[지하철 노선도]
- 지하철은 해당 노선 하나만 있는 것으로 간주합니다. (환승 등 상황 고려 X)
- 역간 간격은 1km로 통일합니다.
- 아래의 노선도를 복붙하셔서 사용하세요.
- '성수', '건대입구', '구의', '강변', '잠실나루', '잠실', '잠실새내', '종합운동장', '삼성', '선릉', '역삼', '강남', '교대', '서초', '방배', '사당', '낙성대', '서울대입구', 
'봉천', '신림', '신대방', '구로디지털단지', '대림', '신도림', '문래', '영등포구청', '당산', '합정', '홍대입구', '신촌', '이대', '아현', '충정로', '시청', '을지로입구', '을지로3가',
'을지로4가', '동대문역사문화공원', '신당', '상왕십리', '왕십리', '한양대', '뚝섬'
[지하철 요금 계산 방식]
- 기본 요금 + 추가 요금(거리비례)
- 기본 요금: 1250원 (기본 요금으로는 10km까지 이동 가능합니다.)
- 추가 요금: 10km를 초과할 경우 5km 당 100원을 추가로 부과합니다. 
Input: 출발역
        (노선도 상에 없는 역을 입력한 경우 "존재하지 않는 역입니다."를 콘솔에 로그하세요.)
Output: 요금
*/

const subway = [
  "성수",
  "건대입구",
  "구의",
  "강변",
  "잠실나루",
  "잠실",
  "잠실새내",
  "종합운동장",
  "삼성",
  "선릉",
  "역삼",
  "강남",
  "교대",
  "서초",
  "방배",
  "사당",
  "낙성대",
  "서울대입구",
  "봉천",
  "신림",
  "신대방",
  "구로디지털단지",
  "대림",
  "신도림",
  "문래",
  "영등포구청",
  "당산",
  "합정",
  "홍대입구",
  "신촌",
  "이대",
  "아현",
  "충정로",
  "시청",
  "을지로입구",
  "을지로3가",
  "을지로4가",
  "동대문역사문화공원",
  "신당",
  "상왕십리",
  "왕십리",
  "한양대",
  "뚝섬",
];

function 요금계산(start, end) {
  if (!(subway.includes(start) && subway.includes(end)))
    return "해당 역은 존재하지 않습니다!";
  let fee = 1250;
  let 거리 = Math.abs(subway.indexOf(start) - subway.indexOf(end));
  if (거리 > 10) {
    return (fee += (Math.floor(거리 - 10) / 5) * 100);
  }
  return fee;
}

console.log(요금계산("대한민국", "영등포구청"));
