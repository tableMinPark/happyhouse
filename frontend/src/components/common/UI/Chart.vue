<template>
  <div>
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import {chart} from 'chart.js;'

export default {
    methods: {
        fillData() {
            const ctx = document.getElementById('chart').getContext('2d');
            this.myChart = new Chart(ctx, {
                type: 'line',
                data: {},
                option: {}
            })
        }
    },
    mounted() {
        this.fillData();
    },
    data() {
        return {
            myChart: null
        }
    }
}
</script>

<style>

</style>