<div align="center">
<h1>Card Monkey</h1>
  <img src="./public/readme_title.jpg" width=100% />
    <h3>
    <b>< KDT3 Front-End : Mini Project Team2 ></b>
  </h3>
</div>

---

# 1. 프로젝트 소개 💁

### 프로젝트 설명

- 패스트캠퍼스의 핀테크 미니 프로젝트로 진행된 프로젝트입니다.
- 금융상품 중에서 카드를 상품으로 다루고, 추천해주는 서비스 입니다.
- 로그인을 하지 않으면 이용할 수 없습니다.
- 주된 기능으로는 로그인, 회원가입, 나의 카드(신청한 카드), 검색, 카드 추천, 관심상품이 있습니다.

### 개발 기간

- 1차: 2023.2.13 ~ 2023.2.24(총 12일)

### 링크 모음

<a href="https://card-monkey.netlify.app">
  <img src="https://img.shields.io/badge/배포사이트-F4AA3C?style=for-the-badge&logo=SurveyMonkey&logoColor=black" />
</a>&nbsp;&nbsp;
<a href="https://cold-clave-816.notion.site/0cb8268940ad439292a5cc522e5964a7">
  <img src="https://img.shields.io/badge/팀노션-e5e5e5?style=for-the-badge&logo=notion&logoColor=black" />
</a>

<br><br>

# 2. 팀원 소개 & 역할 분담 👥

|                                                        소재헌👑                                                         |                                                        이혜란                                                         |                                                          우지수                                                          |                                                         공혜지                                                          |
| :---------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: |
| <a href="https://github.com/Jaeheon-So"><img src="https://avatars.githubusercontent.com/u/79908684?v=4" width=160/></a> | <a href="https://github.com/hyerani"><img src="https://avatars.githubusercontent.com/u/113823957?v=4" width=160/></a> | <a href="https://github.com/jisooround"><img src="https://avatars.githubusercontent.com/u/110647022?v=4" width=160/></a> | <a href="https://github.com/hayden365"><img src="https://avatars.githubusercontent.com/u/109419531?v=4" width=160/></a> |
|                     카드 추천 페이지<br>카드 검색 페이지<br/> 초기세팅, 헤더 <br/> 관심상품 페이지                      |                               메인 페이지<br>(신청한 카드, TOP5 카드)<br>내 정보 페이지                               |                            로그인<br>회원가입/탈퇴<br/>혜택 변경<br> 네비게이션 바<br/>디자인                            |                                        카드상세 페이지<br> api관리 <br/> Up 버튼                                        |

<br><br>

# 4. 기술 스택 ⚙️

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/Axios-671ddf?style=for-the-badge&logo=Axios&logoColor=white"> <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">

<br><br>

# 5. 협업 방식 🤝

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/notion-fc9847?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">

- **Github**
  <br>팀 레포지토리를 만들었습니다.
  <br>develop 브랜치와 각자의 이름으로 브랜치를 생성하고,
  <br>작업이 끝나면 각자의 브랜치로 push 후 pull request를 남기면 팀장이 merge 했습니다.
- **Notion**
  <br>팀원별 진행 과정을 공유하고 회의록을 작성할 때 사용했습니다.
- **Discord**
  <br>회의할 때 주로 사용했고, 설명이 필요한 부분들은 화면도 종종 공유했습니다.
- **Slack**
  <br>간단한 질의/응답/요청 등을 위한 메신저, 혹은 pull request 알리미로 사용했습니다.

<br><br>

# 6. 구현 내용 🛠︎

<details>
<summary>헤더</summary>

- 로고 클릭: 메인 페이지로 이동
- 돋보기 클릭: 검색 체이지로 이동, 검색 페이지에서는 검색 input 렌더
- 로그아웃 클릭: 로그아웃 되어 로그인 페이지로 이동
</details>

<details>
<summary>네비게이션 바</summary>

- 메인 페이지, 추천상품 페이지, 관심상품 페이지, 내 정보 페이지로 이동할 수 있는 네비게이션 바
- react-router 사용
</details>

<details>
   <summary>로그인 페이지</summary>

- 로그인을 하는 페이지
</details>

<details>
   <summary>회원가입 페이지</summary>

- 총 5단계로 이루어지는 회원가입 페이지
- 1단계: 약관 동의
- 2단계: 이름 설정
- 3단계: 아이디 설정, 아이디 중복 확인
- 4단계: 비밀번호 설정
- 5단계: 혜택 설정
   </details>

<details>
<summary>메인 페이지</summary>

- 회원이 신청한 카드목록을 swiper를 활용하여 보여줌
- 인기 TOP5 상품을 보여줌(관심상품으로 등록된 기준)
- 추천 배너 클릭 시 추천상품 페이지로 이동
- 공유 배너 클릭 시 링크 복사
</details>

<details>
<summary>검색 페이지</summary>

- 카드명, 카드사, 카드혜택 별 검색 기능
- 신용, 체크 필터링
- redux를 사용하여 검색결과, 검색 태그들 관리
</details>

<details>
<summary>상세 페이지</summary>

- 해당 카드의 상세 정보를 보여줌(카드명, 카드사, 주요혜택)
- 카드 신청, 관심상품 추가 및 삭제 가능
- 하단에 회원의 추천 상품 보여줌
</details>

<details>
<summary>관심상품 페이지</summary>

- 회원이 관심상품으로 등록한 카드들을 보여줌
- redux를 사용하여 관심상품 관리
- 하트를 클릭하여 관심상품에서 삭제, 추가 가능
- 카드 클릭 시 상세페이지로 이동
   </details>

<details>
   <summary>추천상품 페이지</summary>

- 회원이 가입할 때 선택한 3개의 혜택을 기반으로 상품을 추천
- 항상 랜덤으로 추천
   </details>

<details>
   <summary>내 정보 페이지</summary>

- 회원이 신청한 카드 목록을 보여줌, 신청 취소 가능
- 신용, 체크 필터링
- 회원 정보 수정에서 비밀번호 변경, 회원 탈퇴 가능
   </details>
<br><br>

# 7. 시연

### 회원가입

<img src="./public/시연영상/회원가입.gif">
<br>

### 로그인,로그아웃

<img src="./public/시연영상/로그인_로그아웃.gif">
<br>

### 메인페이지

<img src="./public/시연영상/메인페이지.gif">
<br>

### 검색

<img src="./public/시연영상/검색.gif">
<br>

### 몽키추천

<img src="./public/시연영상/몽키추천.gif">
<br>

### 관심상품

<img src="./public/시연영상/관심상품.gif">
<br>

### 상세페이지

<img src="./public/시연영상/상세페이지.gif">
<br>

### 마이페이지

#### 신청 카드 조회 및 신청 취소

<img src="./public/시연영상/마이페이지_내카드조회.gif">
<br>

#### 비밀번호 수정

<img src="./public/시연영상/마이페이지_비밀번호변경.gif">
<br>

#### 혜택 변경

<img src="./public/시연영상/마이페이지_혜택변경.gif">
<br>

#### 회원탈퇴

<img src="./public/시연영상/마이페이지_회원탈퇴.gif">
<br>

# 8. 아쉬운 점

- 검색 페이지에서 무한스크롤을 하지 못한 점이 아쉽다. 백에서 페이지 네이션을 지원하지 않아서 검색 결과를 모두 가져오는데 이것을 프론트에서 10개씩 쪼개어서 무한스크롤로 보여주려고 했지만 시간상 하지 못했다.

- 검색 페이지에서 검색 된 상품을 클릭하여 상세 페이지로 이동 후 뒤로가기를 하여 돌아오면 다시 검색을 해서 리렌더링 되는 문제가 있어서 이것을 해결하려 했지만 못했서 아쉽다.

- 토큰이 만료되면 로그인 페이지로 리다이렉트 되는 로직을 완벽하게 구현하지 못한 점이 아쉽다.
