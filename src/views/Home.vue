<template>
   <div v-if="$store.state.counts != null">
      <v-row>
         <v-col cols="4">
            <v-card
               elevation="6"
               class="mx-auto radius-1"
               style="text-align: center; padding: 10px"
               max-width="344"
               color="accent"
            >
               <v-icon
                  style="background: white; margin-top: -30px"
                  class="pa-5 elevation-6 radius-1 mb-5"
                  color="warning"
                  >mdi-archive-arrow-up</v-icon
               >
               <h4
                  class="warning-color"
                  style="font-size: 1.4em; font-weight: lighter"
               >
                  عدد الكتب الصادرة
               </h4>
               <h4
                  class="warning-color"
                  style="font-size: 2.5em; font-weight: lighter"
               >
                  {{ $store.state.counts.outer }}
               </h4>
            </v-card>
         </v-col>
         <v-col cols="4">
            <v-card
               elevation="6"
               class="mx-auto radius-1"
               style="text-align: center; padding: 10px"
               max-width="344"
               color="accent"
            >
               <v-icon
                  style="background: white; margin-top: -30px"
                  class="pa-5 elevation-6 radius-1 mb-5"
                  color="warning"
                  >mdi-archive-arrow-down</v-icon
               >
               <h4
                  class="warning-color"
                  style="font-size: 1.4em; font-weight: lighter"
               >
                  عدد الكتب الواردة
               </h4>
               <h4
                  class="warning-color"
                  style="font-size: 2.5em; font-weight: lighter"
               >
                  {{ $store.state.counts.inner }}
               </h4>
            </v-card>
         </v-col>
         <v-col cols="4">
            <v-card
               elevation="6"
               class="mx-auto radius-1"
               style="text-align: center; padding: 10px"
               max-width="344"
               color="accent"
            >
               <v-icon
                  style="background: white; margin-top: -30px"
                  class="pa-5 elevation-6 radius-1 mb-5"
                  color="warning"
                  >mdi-archive-refresh</v-icon
               >
               <h4
                  class="warning-color"
                  style="font-size: 1.4em; font-weight: lighter"
               >
                  عدد المذكرات الداخلية
               </h4>
               <h4
                  class="warning-color"
                  style="font-size: 2.5em; font-weight: lighter"
               >
                  {{ $store.state.counts.inside }}
               </h4>
            </v-card>
         </v-col>
      </v-row>
      <v-row align="center" justify="center">
         <v-col cols="6" class="pa-4">
            <v-card class="ma-2 radius-1 pa-5" elevation="6">
               <SectionChart />
            </v-card>
         </v-col>
         <v-col cols="6" class="pa-4">
            <v-card class="ma-2 radius-1 pa-5" elevation="6">
               <CategoryChart />
            </v-card>
         </v-col>
      </v-row>
   </div>
</template>

<script>
import SectionChart from "./../components/SectionChart.vue";
import CategoryChart from "./../components/CategoryChart.vue";
export default {
   components: {
      SectionChart,
      CategoryChart,
   },
   name: "Home",
   data: () => ({
      advertisements: 0,
      sections: 0,
      categories: 0,
   }),
};
</script>
