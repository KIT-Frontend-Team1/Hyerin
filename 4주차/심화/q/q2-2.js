import { MockPosts } from "./faker.js";
// console.log(MockPosts(5, 10));
const $postList = document.querySelector("#post-list");
const $btnContainer = document.querySelector("#button-container");
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
  btnStyle(currentPage);
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
      <button class="show-comment-button">comments</div>
      <div class="comment-container"></div>
  </div>
  `;
  const commentBtn = content.querySelector(".show-comment-button");
  $postList.appendChild(content);
  const commentContainer = content.querySelector(".comment-container");
  // commentContainer 인자로 전달
  commentContainer.classList.add("none");
  renderComment(obj, commentContainer);
  showComment(commentBtn, commentContainer);
};

//댓글 모두 렌더링 해주는 함수
const renderComment = (obj, commentContainer) => {
  // commentContainer 매개변수 추가
  for (let i = 0; i < obj[0].Comments.length; i++) {
    const contentComment = document.createElement("div");
    contentComment.classList.add("content-comment"); // 클래스 추가 방법 수정
    contentComment.innerHTML = `
      <span><img src=${obj[0].Comments[i].User.profileImg}></span>
      <span class="comment-nickname">${obj[0].Comments[i].User.nickName}</span>
      <span class="comment-content">${obj[0].Comments[i].content}</span>
    `;
    commentContainer.appendChild(contentComment); // commentContainer에 contentComment 추가
  }
  commentBtn.addEventListener("click", () => {
    commentContainer.classList.toggle("none");
  });
};

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
      if (
        Number.isInteger(btn.innerText / 1) &&
        currentPage !== btn.innerText
      ) {
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
  $postList.innerHTML = "";
  renderContent(currentPage);
  // console.log(currentPageGroup);
  renderButton(currentPageGroup);
  btnStyle(currentPage);
  btnClick();
});

//새로운 글 작성
const newPostBtn = document.querySelector("#new-post-btn");
const newPostContainer = document.querySelector("new-post-container");
const postInput = document.querySelector("#post-input");
const submitBtn = document.querySelector("#post-submit-button");
submitBtn.addEventListener("click", () => {
  const newPostContent = postInput.value;
});
