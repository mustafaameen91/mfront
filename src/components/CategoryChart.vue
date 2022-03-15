<template>
   <div>
      <canvas id="category-chart" width="100"></canvas>
   </div>
</template>

<script>
import {
   Chart,
   ArcElement,
   LineElement,
   BarElement,
   PointElement,
   BarController,
   BubbleController,
   DoughnutController,
   LineController,
   PieController,
   PolarAreaController,
   RadarController,
   ScatterController,
   CategoryScale,
   LinearScale,
   LogarithmicScale,
   RadialLinearScale,
   TimeScale,
   TimeSeriesScale,
   Decimation,
   Filler,
   Legend,
   Title,
   Tooltip,
   SubTitle,
} from "chart.js";

Chart.register(
   ArcElement,
   LineElement,
   BarElement,
   PointElement,
   BarController,
   BubbleController,
   DoughnutController,
   LineController,
   PieController,
   PolarAreaController,
   RadarController,
   ScatterController,
   CategoryScale,
   LinearScale,
   LogarithmicScale,
   RadialLinearScale,
   TimeScale,
   TimeSeriesScale
);

export default {
   name: "SectionChart",
   data: () => ({
      sectionData: {
         type: "bar",
         data: {
            labels: ["صادر", "وارد", "مذكرات داخلية", "اوامر ادارية"],
            datasets: [
               {
                  label: "الكتب",
                  data: [0, 0, 1],
                  backgroundColor: "#F7C443",
                  borderColor: "#ffb600",
                  borderWidth: 3,
               },
               {
                  label: "انواع الكتب",
                  data: [0.166, 2.081, 3.003],
                  backgroundColor: "#C08F64",
                  borderColor: "#926C4B",
                  borderWidth: 3,
               },
            ],
         },
         options: {
            responsive: true,
            lineTension: 1,
         },
      },
   }),
   created() {
      if (this.$store.state.counts != null) {
         let dataSet = [
            this.$store.state.counts.inner,
            this.$store.state.counts.outer,
            this.$store.state.counts.inside,
            this.$store.state.counts.order,
         ];

         let dataSetAll = [
            this.$store.state.counts.inner + this.$store.state.counts.inside,
            this.$store.state.counts.inner + this.$store.state.counts.outer,
            this.$store.state.counts.outer + this.$store.state.counts.inside,
            this.$store.state.counts.order + this.$store.state.counts.inside,
         ];

         this.sectionData.data.datasets[0].data = dataSetAll;
         this.sectionData.data.datasets[1].data = dataSet;
      }
   },
   mounted() {
      const ctx = document.getElementById("category-chart");
      new Chart(ctx, this.sectionData);
   },
};
</script>
