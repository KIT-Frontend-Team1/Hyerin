const musicListData = [
  {
    src: "./assets/img/iu_0.jpg",
    color: ["#0272a4", "#f6a564"],
  },
  {
    src: "./assets/img/iu_1.jpg",
    color: ["#b6bfc8", "#36595b"],
  },
  {
    src: "./assets/img/iu_2.jpg",
    color: ["#e58e82", "#6f569f"],
  },
];
/*

문제1.
    디스크 문제 구현하기. 필요한 html, css, animation은 모두 구현하였으나
    혹 본인 재량하에 추가하고 싶은 css와 animation이 있으면 추가해두시면 됩니다.

    요구사항
    
        (1) 구현영상을 참고하여 구현영상과 같은 효과를 진행해보세요
        (2) play 버튼 클릭시에는 해당 이미지에 맞는 이미지가 배경화면으로 보이고 disk가 회전되어야합니다
        (3) stop 버튼을 누르면 배경화면이 사라지고 disk는 멈추어야합니다.
        (4) 앨범은 총 3개가 있으며 만약 진행 중 다른 앨범을 선택하고 play를 누르면 다른 앨범이 play 되어야합니다.
        (5) 앨범 리스트는 (next, prev) 버튼으로도 움직일 수 있으며 클릭으로도 원하는 앨범으로 이동할 수 있습니다.
        (6) 현재 선택된 앨범은 focus되어 크기가 커지는 효과를 추가해야합니다.
        (7) 저작권 상 음악은 넣지 못했지만 만약 넣고 싶다면 본인이 다운로드 하여 audio 태그를 활용하여 실행할 수 있습니다.
        (8) 이 외 다른 구현 사항은 영상을 참고하여 만들어보세요 :)

    주의사항

        단, 아래의 조건만 채운다면 반드시 똑같이 만들 필요는 없습니다.
        즉 애니메이션과 css를 구현 영상과 똑같이 하실 필요는 없으며, 이를 위해 html이나 css를 따로 건드셔도 괜찮습니다.
        해당 html과 css, animation은 제가 빠른 시일 내에 급히 작성한 것이기 때문에 이해가 조금 어려울 수 있습니다

        (1) 각 노래에 맞는 앨범 자켓 이미지로 배경이 바뀌어야함 
        (2) 각 노래에 맞는 색상으로 disk_inner와 stop 상태의 배경이 바뀌어야함
        (3) start 시에는 disk가 돌아가고 stop 시에는 disk가 멈춰야함
        (4) 선택된 앨범에는 하이라이트 호과가 있어야하며 클릭 및 버튼을 통해 선택이 가능함
*/

const $ul = document.querySelector("ul");
const $li = document.querySelectorAll("ul>li");
const $photos = document.querySelectorAll("ul > li>img");
//main은 querySelector로 주기 일반 tagname으로 하기까 에러났음
const $main = document.querySelector("main");
const $frontBtn = document.querySelector(".list_btn_group button:first-child");
const $backBtn = document.querySelector(".list_btn_group button:last-child");
const $playBtn = document.querySelector(".play_btn_group button:first-child");
const $stopBtn = document.querySelector(".play_btn_group button:last-child");
const $diskInner = document.querySelector(".disk_inner");
const $disk = document.querySelector(".disk");
let musicNum = 0;

//함수를 따로 뺄때 index로 주는 부분이 막힘
$photos.forEach((photo, index) => {
  photo.addEventListener("click", () => {
    musicNum = index;
    console.log(musicNum);
    selectedSong(index);
  });
});

const $filter = document.querySelector(".filter");
//musicIndex에 맞게 배경바꿔주는 역할
//index가 변할때마다 실행시켜줄수는 없을까?
function changeBack(index) {
  $filter.style.background = `url(${musicListData[index].src}) no-repeat `;
  $filter.style.backgroundPosition = "center";
  $diskInner.style.backgroundColor = `${musicListData[index].color[0]}`;
}

//앨범선택될떄마다 선택된 사진에 효과주기
function selectedSong(index) {
  $photos.forEach((e) => {
    e.classList.remove("play");
  });
  console.log(musicNum);
  $photos[index].classList.add("play");
}
//왼쪽오른쪽 노래 앨범 이동함
$frontBtn.addEventListener("click", () => {
  if (musicNum <= 0) {
    musicNum = $li.length - 1;
    selectedSong(musicNum);
  } else {
    musicNum -= 1;
    selectedSong(musicNum);
  }
});
$backBtn.addEventListener("click", () => {
  if (musicNum >= $li.length - 1) {
    musicNum = 0;
    selectedSong(musicNum);
  } else {
    musicNum += 1;
    selectedSong(musicNum);
  }
});

//애니메이션 돌아감
$playBtn.addEventListener("click", () => {
  $disk.classList.add("active");
  changeBack(musicNum);
});

//애니메이션 멈춤
$stopBtn.addEventListener("click", () => {
  $disk.classList.remove("active");
});
