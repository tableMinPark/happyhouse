<template>
  <div class="table-responsive"> 
    <table class="table">
      <tbody>
        <tr v-for="(bookmark, index) in bookmarkList" :key="index" >
          <td>
            <router-link :to="`/houseinfo/${bookmark.deal.dealId}`"><div class="task_desc_0">{{ bookmark.house.houseName}}</div></router-link>
          </td>
          <td>
            <div class="task_desc_0">{{ bookmark.house.sidoName }} {{ bookmark.house.gugunName }} {{ bookmark.house.dongName }}</div>
          </td>
          <td>
            <div class="task_desc_0">{{ bookmark.deal.dealArea }} 평</div>
          </td>
          <td>
            <div class="task_desc_0">{{ bookmark.deal.dealPrice }}</div>
          </td>
          <td v-if="isMyPage">
            <a @click="bookmarkDelete(bookmark.bookmarkId)">
              <feather type="trash" size="20"/>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data(){
    return {
      bookmarkList: null
    }
  },
  methods: {
    dealDetail(bookmarkId){
      console.log("call dealDetail " + bookmarkId);
    },
    bookmarkDelete(bookmarkId) {
      console.log("call deleteBookmark " + bookmarkId);
    }
  },
    computed: {
      ...mapState("myPageStore", ["isMyPage", "myPageUserInfo"])
  },
  created() {
    // userId 에 해당하는 값들을 get 하는 부분
    console.log("read Bookmark data for " + this.myPageUserInfo.userId);

    this.bookmarkList = [
      {
        bookmarkId: 1,
        deal: {
          dealId: 1,
          houseId: 1,
          dealPrice: '500/30',
          dealDate: '2022-12-25',
          dealFloor: '21',
          dealArea: '46.843',
          dealCode: '200',
          dealCodeName:'월세'
        },
        house: {
          houseId: 1,
          houseName: '삼정 그린코아',
          houseBuildYear: '2022',
          lat: 12.4,
          lng: 30.1,
          sidoCode: '1',
          sidoName: '부산시',
          gugunCode: '2',
          gugunName: '강서구',
          dongCode: '3',
          dongName: '송정동',
          jibun: '1627-5',
          houseCode: '100',
          houseCodeName: '아파트'
        }
      }
    ]
  }
}
</script>

<style scoped>
table {
  table-layout: fixed;
}
td div {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
a {
  cursor: pointer;
}
</style>