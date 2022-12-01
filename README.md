# Happy House

### 📌 삼성 청년 SW 아카데미 1학기 관통 프로젝트

<br>

## **개요**

✔ 공공 데이터를 활용한 서울 아파트 매매 정보 검색 사이트

<br><br>

## 프로젝트 기간

✔ 2021년 11월 16일 ~ 2021년 11월 25일

<br><br>

## 기술 스택

<p align="center">
  <img src="https://img.shields.io/badge/API-Kakao_Map-red?style=flat"> 
  <img src="https://img.shields.io/badge/Library-Bootstrap-563D7C?style=flat&logo=bootstrap&logoColor=white"> 
  <img src="https://img.shields.io/badge/Language-Java-007396?style=flat&logo=java&logoColor=white"> 
  <img src="https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=white"> 
  <img src="https://img.shields.io/badge/Database-MySql-F80000?style=flat&logo=mysql&logoColor=white"> 
  <img src="https://img.shields.io/badge/Framework-Vue-D22128?style=flat&logo=vue.js&logoColor=white"> 
  <img src="https://img.shields.io/badge/Framework-Spring-6DB33F?style=flat&logo=spring&logoColor=white">

</p>

###### <br><br>

## 팀원

<table>
  <thead>
    <tr>
      <th>이름</th>
      <th>역할</th>
      <th>구현 기능</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>서우린</td>
      <td>팀장</td>
      <td>공지사항(공지사항 등록, 수정, 삭제), 매물관리(매물등록, 수정, 삭제)</td>
    </tr>
    <tr>
      <td>박상민</td>
      <td>팀원</td>
      <td>회원관리(회원가입, 로그인, 비밀번호찾기, 회원정보수정, 팔로우, 이메일 인증), 관심매물, 리뷰, 카카오맵</td>
    </tr>
  </tbody>
</table>

<br><br>

## **DataBase 설계**

![ERD](./assets/ERD.png)

<br><br>

## 요구사항 명세서

![요구사항명세서](./assets/요구사항명세서.png)

<br><br>

## 실행 화면

### 📌 공통기능 - 실거래가 조회 메인화면

![실거래가조회_메인화면](./assets/실거래가조회_메인화면.gif)

✔ 메인화면에서 키워드 또는 주소를 통해 실거래가를 조회

<br><br>

### 📌 공통기능 - 실거래가 조회 키워드

![실거래가조회_키워드](./assets/실거래가조회_키워드.gif)

✔ 키워드를 통해 실거래가 조회

<br><br>

### 📌 공통기능 - 실거래가 조회 주소

![실거래가조회_주소](./assets/실거래가조회_주소.gif)

✔ 주소를 통해 실거래가 조회

<br><br>

### 📌 공통기능 - 실거래가 조회 - 매물 상세 정보

![실거래가조회_매물상세정보](./assets/실거래가조회_매물상세정보.gif)

✔ 실거래가를 조회하고 매물 리스트를 통해 매물 상세 정보를 확인할 수 있음

<br><br>

### 📌 공통기능 - 거래 매물 조회

![일반_매물조회](./assets/일반_매물조회.gif)

✔ 전세, 월세, 매매 별로 매물을 조회할 수 있음<br>
✔ 키워드를 통해 매물을 조회할 수 있음<br>
✔ 매물 상세정보를 통해 매물에 대한 정보와 리뷰를 확인할 수 있고, 지도를 통해 실제 위치를 확인할 수 있음

<br><br>

### 📌 공통기능 - 회원가입

![회원가입](./assets/회원가입.gif)

✔ 일반, 기업 회원으로 분리하여 회원가입이 가능함<br>
✔ 이메일 인증을 통해 사용자 인증<br>
✔ 입력되지 않은 항목을 표시<br>
✔ 중복 이메일 체크

<br><br>

### 📌 공통기능 - 비밀번호 찾기

![비밀번호찾기](./assets/비밀번호찾기.gif)

✔ 이메일을 통해 임시 비밀번호 발송

<br><br>

### 📌 공통기능 - 프로필 수정

![프로필수정](./assets/프로필수정.gif)

✔ 프로필 사진을 변경할 수 있음<br>
✔ 사용자 정보 (비밀번호, 주소, 전화번호) 를 수정할 수 있음

<br><br>

### 📌 공통기능 - 팔로우 

![친구팔로우_언팔로우](./assets/친구팔로우_언팔로우.gif)

✔ 다른 사용자를 팔로우, 언팔로우 할 수 있음<br>
✔ 팔로우 한 사용자를 마이페이지에서 확인할 수 있음

<br><br>

### 📌 공통기능 - 공지사항 조회 

![일반_공지사항조회](./assets/일반_공지사항조회.gif)

✔ 로그인한 사용자는 공지사항을 확인할 수 있음

<br><br>

---

### 📌 일반회원 - 관심매물등록 및 삭제

![관심매물등록_삭제](./assets/관심매물등록_삭제.gif)

✔ 매물 상세 조회에서 관심매물을 등록할 수 있음<br>
✔ 마이페이지에서 관심매물을 확인할 수 있음<br>
✔ 마이페이지에서 관심매물을 삭제할 수 있음

<br><br>

### 📌 일반회원 - 리뷰 등록

![리뷰등록](./assets/리뷰등록.gif)

✔ 매물 상세 조회에서 리뷰를 등록할 수 있음<br>
✔ 마이페이지에서 작성한 리뷰를 확인할 수 있음

<br><br>

### 📌 일반회원 - 리뷰 수정 및 삭제

![리뷰수정_삭제](./assets/리뷰수정_삭제.gif)

✔ 마이페이지에서 작성한 리뷰를 수정 및 삭제할 수 있음

<br><br>

---

### 📌 기업회원 - 매물 등록

![매물등록](./assets/매물등록.gif)

✔ 마이페이지에서 매물을 등록할 수 있음<br>
✔ 실제 존재하는 주소만 등록이 가능

<br><br>

### 📌 기업회원 - 매물 수정

![매물수정](./assets/매물수정.gif)

✔ 마이페이지에서 자신이 등록한 매물을 수정할 수 있음<br>

<br><br>

### 📌 기업회원 - 매물 거래완료 등록 및 삭제

![매물 거래완료_삭제](./assets/매물 거래완료_삭제.gif)

✔ 마이페이지에서 매물을 거래완료로 등록할 수 있음<br>
✔ 자신이 등록한 매물을 삭제할 수 있음

<br><br>

### 📌 관리자 - 공지사항 등록

![공지사항등록](./assets/공지사항등록.gif)

✔ 관리자만 공지사항을 등록할 수 있음<br>
✔ 공지사항 등록 시 중요공지를 체크하여 중요공지로 올릴 수 있음

<br><br>

### 📌 관리자 - 공지사항 수정 및 삭제

![공지사항 삭제_수정](./assets/공지사항 삭제_수정.gif)

✔ 관리자만 공지사항을 수정할 수 있음<br>
✔ 관리자만 공지사항을 삭제할 수 있음<br>
✔ 공지사항 수정 시 중요공지로 수정할 수 있음

<br><br>
