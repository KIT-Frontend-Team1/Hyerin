import { MockPosts } from "./faker.js";
const $postList = document.querySelector("#post-list");
const $btnContainer = document.querySelector("#button-container");
let totalItemCount = MockPosts(10).length;
console.log(MockPosts(1));
//현재페이지는 url에서 page=뒤에서 가져온 숫자가 됨
//새로고침시 해당 페이지를 currentPage로 저장하기 위함
//만약 page=뒤의 숫자가 없다면(초기 렌더링시) 1로 지정
let currentPage = new URLSearchParams(window.location.search).get("page");
if (!currentPage) {
  currentPage = 1;
}
//하나의 페이지에 보여줄 컨텐츠(조정가능)
let onePageShow = 10;
//한 그룹에 몇개 보여줄건지(버튼 그룹)
let oneGroupShow = 10;
//페이지가 총 몇개이냐.(20개임)
let pageCount = Math.ceil(totalItemCount / onePageShow);
//현재 페이지 그룹
//1페이지 => 1그룹, 15페이지 => 2그룹
let currentPageGroup = Math.ceil(currentPage / oneGroupShow);
//마지막 페이지 그룹 => 현재 페이지 그룹이 이거면 다음버튼 생성 안됨
let lastPageGroup = pageCount / onePageShow;

//이전 버튼 생성
const beforeBtn = document.createElement("button");
beforeBtn.innerText = "이전";
beforeBtn.addEventListener("click", () => {
  //기존의 버튼들 지워주기
  $btnContainer.innerHTML = "";
  currentPageGroup -= 1;
  renderButton(currentPageGroup);
  btnClick();
});

//다음버튼 생성
const nextBtn = document.createElement("button");
nextBtn.innerText = "이후";
nextBtn.addEventListener("click", () => {
  //기존의 버튼들 지워주기
  $btnContainer.innerHTML = "";
  currentPageGroup += 1;
  //다음 currentPageGroup로 버튼을 생성함
  renderButton(currentPageGroup);
  btnClick();
});

//맨처음버튼
const firstBtn = document.createElement("button");
firstBtn.innerText = "맨처음";
firstBtn.addEventListener("click", () => {
  //기존 버튼, 포스트 지우기
  $btnContainer.innerHTML = "";
  $postList.innerHTML = "";
  currentPage = 1;
  currentPageGroup = 1;
  //해당 currentPage의 url로 이동
  //새로고침하면 데이터가 자동 변환
  location.href = "?page=" + currentPage;
  //페이지 전환후 실행될 코드
  renderButton(currentPageGroup);
  btnStyle(currentPage);
  document.getElementById(1).classList.add("active");
  btnClick();
  btnStyle(currentPage);
});

//마지막버튼
const lastBtn = document.createElement("button");
lastBtn.innerText = "마지막";
lastBtn.addEventListener("click", () => {
  $btnContainer.innerHTML = "";
  $postList.innerHTML = "";
  currentPage = 20;
  currentPageGroup = 2;
  location.href = "?page=" + currentPage;
  renderButton(currentPageGroup);
  document.getElementById(20).classList.add("active");
  btnClick();
});

//renderButton :버튼 리스트 만드는 함수
//currentPageGroup이 1이면 1번부터 10번까지의 버튼을 만든다.
const renderButton = (currentPageGroup) => {
  $btnContainer.innerHTML = "";
  for (
    let id = (currentPageGroup - 1) * 10 + 1;
    id < (currentPageGroup - 1) * 10 + 11;
    id++
  ) {
    const $button = document.createElement("button");
    $button.innerText = id;
    $button.id = id;
    $button.classList.add("number-btn");
    $btnContainer.appendChild($button);
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

//새로운 글 작성
const newPostBtn = document.querySelector("#new-post-btn");
const newPostContainer = document.querySelector("#new-post-container");
const postInput = document.querySelector("#post-input");
const submitBtn = document.querySelector("#post-submit-button");
const titleInput = document.querySelector("#post-title-input");
//목업데이터 변수 지정
const objArr = MockPosts(10); // objArr 변수 추가

//콘텐츠 렌더링하는 함수
const renderContent = () => {
  $postList.innerHTML = "";
  const content = document.createElement("li");
  content.classList.add("content");
  $postList.appendChild(content);
  //목업데이터를 map해서 innerHTML로 렌더링
  const postHTML = objArr
    .map((obj) => {
      return `<div class="post-container">
    <div class="user-container">
    <span><img class="content-author-img" src=${obj.User.profileImg}/></span>
    <span class="content-author">${obj.User.nickName}</span>
    <span class="content-time">${obj.createdAt}</span>
  </div>
    <div class="content-container">
      <span class="content-title">${obj.title}</span>
      <span class="content-content">${obj.content}</span>
    </div>
    <div class="mypost-btn-container">
     <button class="edit-btn">수정</button>
     <button class="delete-btn">삭제</button>
    </div>
    <button class="show-comment-button">comments</button>
    <span class="show-comment-number"></span></div>
    <span class="comments-number"></span>
    <div class="comment-container"></div>
</div>
`;
    })
    .join("");
  content.innerHTML = postHTML;
  const commentContainers = document.querySelectorAll(".comment-container"); // 모든 commentContainer 선택
  const commentBtns = document.querySelectorAll(".show-comment-button");
  const myPostBtns = document.querySelectorAll(".mypost-btn-container");
  const commentNum = document.querySelectorAll(".show-comment-number");
  const deleteBtns = document.querySelectorAll(".delete-btn");
  const editBtns = document.querySelectorAll(".edit-btn");
  //전체 데이터 objArr에서 forEach로 해당 콘텐츠를 뽑아 해당하는 comments를 렌더링함
  objArr.forEach((obj, i) => {
    renderComment(obj, commentContainers[i], commentBtns[i], commentNum[i]); // 각각의 commentContainer에 대해 renderComment 호출
    commentContainers[i].classList.add("none");
    myPostBtns[i].classList.add("none");
    if (obj.myPost === true) {
      myPostBtns[i].classList.remove("none");
    }
    //자기 글 삭제하는 기능
    deleteBtns[i].addEventListener("click", deleteFunc);
    //자기 글 수정하는 기능
    editBtns[i].addEventListener("click", editFunc);
  });
};

//자기 글 삭제하는 함수
const deleteFunc = (e) => {
  const targetPost = e.target.parentNode.parentNode;
  targetPost.parentNode.removeChild(targetPost);
};

//자기 글 수정하는 함수
const editFunc = (e) => {
  const targetPost = e.target.parentNode.parentNode;
  console.log(targetPost);
  const container = targetPost.querySelector(".content-container");
  const title = targetPost.querySelector(".content-title");
  const content = targetPost.querySelector(".content-content");
  container.innerHTML = "";
  container.innerHTML = `
  <input class="edit-title-input" placeholder="title.."/>
  <input class="edit-content-input" placeholder="content.."/>
  <button class="edit-ok-button">확인</button>`;
  const newTitleInput = container.querySelector(".edit-title-input");
  const newContentInput = container.querySelector(".edit-content-input");
  const editOkbtn = container.querySelector(".edit-ok-button");

  //기본의 제목과 글을 가져옴
  newTitleInput.value = title.innerText;
  newContentInput.value = content.innerText;
  editOkbtn.addEventListener("click", function () {
    objArr.shift();
    objArr.unshift({
      id: Math.floor(Math.random() * 100000),
      title: newTitleInput.value,
      Comments: [],
      Post_img: [],
      User: {
        id: "1231",
        nickName: "hyerin",
        profileImg: "https://loremflickr.com/623/480",
      },
      content: newContentInput.value,
      createdAt: "",
      myPost: true,
    });
    content.innerHTML = "";
    renderContent();
  });
};
//제출버튼 클릭시 새로운 포스트 생성
//이 newPost는 objArr에 추가되고 대신 마지막 post가 삭제된다.
//이렇게 변한 objArr를 재렌더링한다.
submitBtn.addEventListener("click", () => {
  objArr.unshift({
    id: Math.floor(Math.random() * 100000),
    title: titleInput.value,
    Comments: [],
    Post_img: [],
    User: {
      id: "1231",
      nickName: "hyerin",
      profileImg: "https://loremflickr.com/623/480",
    },
    content: postInput.value,
    createdAt: "",
    myPost: true,
  });
  objArr.pop();
  titleInput.value = "";
  postInput.value = "";
  renderContent();
});

//댓글 보여주는 함수
//해당하는 댓글을 for문으로 순회하여 innerHTML로 만든다
//각각 포스트의 commentContainer에 추가한다.
const renderComment = (obj, commentContainer, commentBtn, commentNum) => {
  if (!obj.Comments) return;
  for (let i = 0; i < obj.Comments.length; i++) {
    commentNum.innerText = `댓글 ${obj.Comments.length}개`;
    const contentComment = document.createElement("div");
    contentComment.classList.add("content-comment");
    contentComment.innerHTML = `
      <span><img src=${obj.Comments[i].User.profileImg}></span>
      <span class="comment-nickname">${obj.Comments[i].User.nickName}</span>
      <span class="comment-content">${obj.Comments[i].content}</span>
    `;
    commentContainer.appendChild(contentComment);
    commentBtn.addEventListener("click", function () {
      commentContainer.classList.toggle("none");
    });
  }
};

//숫자 버튼을 클릭하면 해당 버튼의 innerText가 현재 페이지가 된다.
//그 현재페이지로 url을 바꿔 새로고침한다.
const btnClick = () => {
  $btnContainer.childNodes.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (
        Number.isInteger(btn.innerText / 1) &&
        currentPage !== btn.innerText
      ) {
        console.log(btn.innerText);
        currentPage = btn.innerText;
        renderContent();
        btnStyle(currentPage);
        //버튼 클릭할 때마다 현재 페이지로 로컬저장소의 번호를 바꿔줌
        location.href = "?page=" + currentPage;
      }
    });
  });
};
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
renderContent(currentPage);
btnStyle(currentPage);
