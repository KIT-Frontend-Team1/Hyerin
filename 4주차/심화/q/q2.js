import { MockPosts } from "./faker.js";
// console.log(MockPosts(5, 10));
const $postList = document.querySelector("#post-list");
const $btnContainer = document.querySelector("#button-container");
const $contentContainer = document.querySelector(".content-container");
console.log(MockPosts(1)[0].id);
console.log(MockPosts(1));
console.log(MockPosts(1));

//현재 currentPage를 localStorage에 저장함
const localDataChange = (currentPage) => {
  localStorage.setItem("currentPage", currentPage);
};

let totalItemCount = MockPosts(200).length;
console.log(totalItemCount); //200개
//현재 페이지 위치
//버튼을 클릭하면 그것이 현재페이지가 됨
let currentPage = 1;
//하나의 페이지에 보여줄 컨텐츠
let onePageShow = 10;
//페이지가 총 몇개이냐.(20개임)
let pageCount = Math.ceil(totalItemCount / onePageShow);
//한 페이지 그룹에 몇개 보여줄지
let oneGroupShow = 10;
//현재 페이지 그룹이 무슨 그룹인지
//자동으로 지정됨.
let currentPageGroup = Math.ceil(currentPage / oneGroupShow);
//마지막 페이지 그룹 => 현재 페이지 그룹이 이거면 다음버튼 생성 안됨
let lastPageGroup = totalItemCount / onePageShow / oneGroupShow;
//한 페이지의 마지막 넘버.
// let lastNumber = currentPage * onePageShow;
// //첫번째 number는 마지막넘버에서 현재 페이지
// let firstNumber = (currentPage - 1) * onePageShow + 1;

//버튼안의 text가 현재 페이지가 됨

//이전 버튼 생성
const beforeBtn = document.createElement("button");
beforeBtn.innerText = "이전";
beforeBtn.addEventListener("click", () => {
  //기존의 버튼들 지워주기
  $btnContainer.innerHTML = "";
  // console.log(currentPage);
  // console.log(currentPageGroup);
  currentPageGroup -= 1;
  renderButton(currentPageGroup);
  //가장 첫번째 페이지로 이동함
  //   currentPage = currentPageGroup * 10 - 9;
  currentPage = 1;
  // console.log(currentPage);
  // console.log(currentPageGroup);
  btnClick();
});

//다음버튼 생성
const nextBtn = document.createElement("button");
nextBtn.innerText = "이후";

nextBtn.addEventListener("click", () => {
  //기존의 버튼들 지워주기
  $btnContainer.innerHTML = "";
  // console.log(currentPage);
  // console.log(currentPageGroup);
  currentPageGroup += 1;
  currentPage = 11;
  //다음 currentPage로 버튼을 생성함
  renderButton(currentPageGroup);
  btnClick();
});

//맨처음버튼
const firstBtn = document.createElement("button");
firstBtn.innerText = "맨처음";
firstBtn.addEventListener("click", () => {
  $btnContainer.innerHTML = "";
  $postList.innerHTML = "";
  currentPage = 1;
  renderContent(currentPage);
  // btnStyle(currentPage);
  renderButton(1);
  btnClick();
});

//마지막버튼
const lastBtn = document.createElement("button");
lastBtn.innerText = "마지막";
lastBtn.addEventListener("click", () => {
  $btnContainer.innerHTML = "";
  $postList.innerHTML = "";
  currentPage = pageCount;
  renderContent(currentPage);
  renderButton(lastPageGroup);
  btnClick();
});

//makeButton : 버튼 만들어주는 함수
//한 페이지당 10개씩 버튼을 만들어주면 됨
const makeButton = (id) => {
  const $button = document.createElement("button");
  $button.innerText = id;
  $button.id = id;
  $button.classList.add("number-btn");
  $btnContainer.appendChild($button);
};

//renderButton :버튼 리스트 만드는 함수
//currentPageGroup이 1이면 1번부터 10번까지의 버튼을 만든다.
const renderButton = (currentPageGroup) => {
  $btnContainer.innerHTML = "";
  for (
    let id = (currentPageGroup - 1) * 10 + 1;
    id < (currentPageGroup - 1) * 10 + 11;
    id++
  ) {
    makeButton(id);
  }
  //이전/다음버튼 넣어주기
  $btnContainer.prepend(beforeBtn);
  $btnContainer.append(nextBtn);
  const btnFirstChild = $btnContainer.firstChild;
  $btnContainer.insertBefore(beforeBtn, btnFirstChild);
  $btnContainer.insertBefore(firstBtn, beforeBtn);
  $btnContainer.appendChild(nextBtn);
  $btnContainer.appendChild(lastBtn);
  //이전버튼이 필요한지 체크
  if (currentPageGroup === 1) {
    $btnContainer.removeChild(beforeBtn);
  }
  //이후버튼이 필요한지 체크
  if (currentPageGroup === lastPageGroup) {
    $btnContainer.removeChild(nextBtn);
  }
};

//콘텐츠 띄우는 함수
//콘텐츠 하나하나를 만든다.
const makeContent = (id) => {
  const content = document.createElement("li");
  content.classList.add("content");
  //객체 하나를 지정하기
  const obj = MockPosts(1);
  content.innerHTML = `
  <span class="post-id">${id}</span>
  <div class="post-container">
      <div class="user-container">
        <span><img class="content-author-img" src=${obj[0].User.profileImg}/></span>
        <span class="content-author">${obj[0].User.nickName}</span>
        <span class="content-time">${obj[0].createdAt}</span>
      </div>
      <div class="content-container">
        <span class="content-title">${obj[0].title}</span>
        <span class="content-content">${obj[0].content}</span>
      </div>
      <button class="show-comments">show comments</button>
      <div class="content-comments"></div>
  </div>
  `;
  //해당 contents를 map돌려서 새로운 div태그에 추가하기
  //토글버튼을 누르면 보이고 아니면 안보이게 하기
  $postList.appendChild(content);
};
console.log(MockPosts(1)[0].Comments[0]);

const showCommentBtn = document.querySelectorAll(".show-comments");
showCommentBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("haha");
  });
});

//댓글추가하는 함수
// const commentContainer = document.querySelector(".content-comments");
// const showComments = (obj) => {
//   // console.log(obj[0].Comments[0]);
//   commentContainer.innerHTML = `<div>obj[0].Comments[0]</div>`;
// };

//콘첸츠 전체를 10개 렌더링하는 함수. renderContent를 사용한다.
//선택된 currentPage의 콘텐츠들을 렌더링한다.
const renderContent = (currentPage) => {
  $postList.innerHTML = "";
  for (
    let id = (currentPage - 1) * onePageShow + 1;
    id <= currentPage * onePageShow;
    id++
  ) {
    makeContent(id);
  }
};
const btnClick = () => {
  $btnContainer.childNodes.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (Number.isInteger(btn.innerText / 1)) {
        console.log(btn.innerText);
        currentPage = btn.innerText;
        renderContent(currentPage);
        btnStyle(currentPage);
        //버튼 클릭할 때마다 현재 페이지로 로컬저장소의 번호를 바꿔줌
        localDataChange(currentPage);
      }
    });
  });
};
renderContent(currentPage);
renderButton(currentPageGroup);
btnClick();
//현재 선택된 버튼 스타일 바꿔주는 함수
const btnStyle = (currentPage) => {
  $btnContainer.childNodes.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.innerText === currentPage) {
      btn.classList.add("active");
    }
  });
};

//로컬저장소에 저장된 currentPage의 값을 꺼내서, currentPage라는
//변수에 재할당
//그 바뀐 값으로 버튼스타일과, 콘텐츠를 다시 만들어준다.
currentPage = localStorage.getItem("currentPage") || 1;
renderContent(currentPage);
renderButton(currentPageGroup);
btnStyle(currentPage);

window.addEventListener("load", function () {
  renderContent(currentPage);
  console.log(currentPageGroup);
  renderButton(currentPageGroup);
  btnStyle(currentPage);
  btnClick();
});
/*-----------------------------------------------------------------------------------------

백엔드 없이 게시판 만들기Ò

-----------------------------------------------------------------------------------------

문제1. 페이지네이션 만들기
    총 아이템의 갯수는 totalItemCount개 입니다.
    해당 갯수를 토대로 한 페이지당 10개의 Post가 보이는 페이지네이션을 구현해주세요

    단, 현재 총 아이템의 갯수는 200개이며 10개씩 보여준다면 총 20개의 페이지가 나와야합니다.
    그러나 이 개수는 언제든 변화될 수 있으며 만약 해당 갯수가 변화된다면 페이지네이션도 변경되어야합니다.

요구사항
    1.
        1~20의 페이지를 한번에 보여주는 것이 아닌 10페이지 단위로 페이지를 보여주어야하며
        10페이지에서 마지막 페이지를 클릭한다면 11~20페이지가 보여야합니다

        ex)
        1~10 > 다음버튼 > 11~20

        각 버튼의 좌우의 끝에는 맨처음 페이지로 이동할 수 있는 버튼과
        맨끝으로 이동할 수 있는 버튼이 있어야합니다.

    2. 
        페이지를 누르면 페이지에 맞는 번호가 하이라이트 되어야합니다.
        또한, 새로고침 시에도 이 focus효과는 유지되어야합니다.

        ex) 현재 페이지5
        <<(맨처음) <(이전) 1 2 3 4 [5] 6 7 8 9 10 (다음)> (마지막)>>
        
        5에 focus효과 새로고침 이후에도 5에는 focus효과가 유지되어야합니다.
        

    3.  
        페이지를 눌러 이동 되었을 때 동일한 데이터를 불러올 수 있는 backend가 없으므로
        MockPosts를 함수를 활용하여 새로운 10개의 랜덤한 게시물을 보여주셔야 합니다.

-----------------------------------------------------------------------------------------

문제2. 게시글 CRUD 구현하기
    게시글 구성에 필요한 가상 데이터를 생성하는 함수 MockPosts는 안에 넣은 인자의 갯수만큼 가상의 포스트 데이터를 생성하는 함수입니다.
    해당 함수의 상세 데이터는 제가 상단에 console.log를 통해 출력해두었으니 개발자 도구로 확인해보세요 :)

요구사항
    1.
        게시글은 페이스북 혹은 인스타그램의 형태로 한 페이지에 10개씩 보이게 됩니다.
        댓글은 토글 형태로 "댓글 보기"를 클릭해야만 해당 댓글을 확인할 수 있습니다.
        
    2. 
        각 게시물과 댓글에는 내가 작성한 글인지 알 수 있는 flag가 들어있으며
        현재 기존에 작성된 모든 가상 데이터의 해당 flag는 false입니다.
        그러나 만약 본인이 새로운 게시글과 댓글을 작성한다면 해당 flag는 true의 형태가 되어야합니다.

    3.
        페이지네이션과 함께 게시글의 CRUD 구현하기
        게시글을 작성할 수 있습니다. 댓글을 작성할 수 있습니다. 새로운 게시글은 내가 작성한 것이기에 flag는 true입니다.
    
        * 주의)
            백엔드가 존재하지 않기 때문에 파일 업로드 기능을 구현할 수 없기에 사진을 업로드 할 수 없습니다.
            따라서 게시글 추가 시 올라가는 이미지의 속성인 Post_img의 경우 빈배열로 두거나 빈 값으로 두시면 됩니다 :)

            게시글 작성과 댓글 작성 시 작성자의 프로필 이미지는 본인이 원하는 대체 이미지로 고정하여 대체 하시면 됩니다.
            
        본인이 작성한 게시글과 댓글에만 수정과 삭제 버튼이 보여야합니다.
        삭제, 수정 버튼의 기능은 모두 적상적으로 기능이 작동 되어야합니다.

-----------------------------------------------------------------------------------------
*/
