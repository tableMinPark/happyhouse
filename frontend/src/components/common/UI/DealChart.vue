<template>
    <div>
        <canvas id="chart"></canvas>
    </div>
</template>


<script>
// 최근 1년간 거래 내역 차트로 표시
import Chart from 'chart.js';

export default {
    // 전세, 월세, 매매
    props: ["oldDealData"],
    data() {
        return {
            myChart: null,
        }
    },
    methods: {
        createChart(chartData) {
            if (this.myChart !== null) {
                this.myChart.destroy();
            }

            const ctx = document.getElementById('chart');
            this.myChart = new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options,
            });
        }
    },
    watch: {
        oldDealData() {
            const chartData = {
                type: 'line',
                data:
                {
                    labels: this.oldDealData.labels,
                    datasets: [
                        // 전세 데이터
                        {
                            label: '전세',
                            data: this.oldDealData.charterData,
                            backgroundColor: [
                                'rgba(54, 73, 93, .5)',
                            ],
                            borderColor: [
                                '#36495d',
                            ],
                            borderWidth: 2
                        },
                        // 매매 데이터
                        {
                            label: '매매',
                            data: this.oldDealData.dealingData,
                            backgroundColor: [
                                'rgba(71, 183, 132, .5)',
                            ],
                            borderColor: [
                                '#47b784',
                            ],
                            borderWidth: 2
                        }
                    ],
                    options: {
                        responsive: true,
                        lineTension: 1,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    padding: 25,
                                }
                            }]
                        }
                    }
                }
            }
            this.createChart(chartData);
        }
    }

}
</script>

<style>

</style>