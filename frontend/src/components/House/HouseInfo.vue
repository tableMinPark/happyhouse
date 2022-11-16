<template>  
    <div class="container-fluid">
    <div class="row">
        <div class="col-7" style="height: 100%">
        <div class="card">
            <div class="card-header pb-0">
            <h5>House Images</h5>
            </div>
            <div class="card-body">
            <div class="owl-carousel owl-theme owl-loaded owl-drag" id="owl-carousel-14">
                <div class="owl-stage-outer owl-height" style="height: 150px">
                <div class="owl-stage" style="transform: translate3d(-3504px, 0px, 0px); transition: all 0s ease 0s; width: 12848px">
                    <div class="owl-item" style="width: 150px; margin-right: 10px">
                    <div class="item"><img src="https://edu.ssafy.com/asset/images/header-logo.jpg" alt="" /></div>
                    </div>
                </div>
                </div>
                <div class="owl-nav disabled">
                <button type="button" role="presentation" class="owl-prev" data-bs-original-title="" title=""><span aria-label="Previous">‹</span></button
                ><button type="button" role="presentation" class="owl-next" data-bs-original-title="" title=""><span aria-label="Next">›</span></button>
                </div>
            </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header pb-0 d-flex justify-content-between">
              <h5 class="card-title">Reviews</h5>
                <button class="btn btn-primary" @click.prevent="showReviewRegister">
                <feather type="file-text" size="18"/>
              </button>
            </div>
            <div class="card-body">
              <review-list></review-list>
            </div>
        </div>
        </div>
        <div class="col-5" style="height: 100%">
        <div class="card" style="height: 70%">
            <div class="card-header pb-0">
            <h5 class="card-title">Infomation</h5>
            </div>
            <div class="card-body">
            <table class="table table-bordered">
                <colgroup>
                <col span="1" style="width: 20%" />
                <col span="1" style="width: 80%" />
                </colgroup>

                <tbody>
                <tr v-for="i in 7" :key="i">
                    <th scope="col">정보 1</th>
                    <td>dd</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>

        <div class="card">
            <div class="card-header pb-0">
            <h5 class="card-title">Map</h5>
            </div>
            <div id="kakao-map" class="card-body"></div>
        </div>
        </div>
    </div>
    <!-- Modal -->
    <review-register-modal v-on:call-parent-register-close="closeReviewRegister"></review-register-modal>
    </div>
  </template>
  
  <script>  

import ReviewList from '@/components/House/Item/ReviewList.vue';
import ReviewRegisterModal from "@/components/Modal/ReviewRegisterModal.vue";

import { Modal } from "bootstrap";

  export default {
    components: {
      ReviewList,
      ReviewRegisterModal
    },
    data() {
      return {
        map: null,
        reviewRegisterModal: null
      }
    },
    methods: {
      initMap() {
        let mapContainer = document.querySelector("#kakao-map")
        let mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 1,
        }
        this.map = new kakao.maps.Map(mapContainer, mapOption)
      },
      showReviewRegister() {
        this.reviewRegisterModal.show();          
      },
      closeReviewRegister() {
        this.reviewRegisterModal.hide();
      }
    },
  
    mounted() {
      if (!window.kakao || !window.kakao.maps) {
        const script = document.createElement("script")
        script.setAttribute("src", "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=b17c3ca2cf51dc08967913607c029db4&libraries=services")
        /* global kakao */
        script.addEventListener("load", () => {
          kakao.maps.load(this.initMap)
        })
        document.head.appendChild(script)
      } else {
        this.initMap()
      }
      this.reviewRegisterModal = new Modal(document.getElementById("reviewRegisterModal"));

    },
  }
  </script>
  
  <style>
  #kakao-map {
    height: 450px;
  }
  #houseInfoImage {
    height: 500px;
  }
  </style>
  