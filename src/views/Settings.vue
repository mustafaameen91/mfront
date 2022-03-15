<template>
   <div>
      <v-container class="container" fluid>
         <v-card color="accent" elevation="6">
            <v-row style="margin: 10px">
               <v-col cols="10">
                  <h3 class="warning-color">صفحة الاعدادات</h3>
               </v-col>
            </v-row>
         </v-card>
      </v-container>
      <v-container class="container" fluid>
         <v-card color="white">
            <v-row style="margin: 10px" align-content="center">
               <v-col cols="4">
                  <h3 style="margin-top: 10px" class="warning-color">
                     السنة الحالية :
                  </h3>
               </v-col>
               <v-col cols="4" align="center">
                  <v-combobox
                     v-model="yearSelected"
                     :items="years"
                     label="السنة المختارة"
                  ></v-combobox>
               </v-col>
               <v-col cols="4" align="center">
                  <v-btn
                     color="primary"
                     elevation="1"
                     style="margin-top: 10px"
                     @click="setNewYear"
                  >
                     حفظ
                  </v-btn>
               </v-col>
            </v-row>
         </v-card>
      </v-container>
   </div>
</template>

<script>
export default {
   data: () => ({
      years: [],
      selectedYear: 0,
      yearSelected: "",
      originalYears: [],
   }),
   created() {
      this.initialData();
   },
   methods: {
      initialData() {
         let self = this;
         self.$http
            .get(`${self.$store.state.apiUrl}/yearStudies`)
            .then((res) => {
               self.years = res.data.map((year) => year.year);
               self.originalYears = res.data;
               self.selectedYear = self.$store.state.selectedYear;
               self.yearSelected = res.data.filter((year) => {
                  if (year.idYearStudy == self.selectedYear) {
                     return year;
                  }
               })[0].year;
            });
      },

      setNewYear() {
         let self = this;
         let findYear = self.originalYears.filter((year) => {
            if (year.year == self.yearSelected) {
               return year;
            }
         });

         self.$store.state.selectedYear = findYear[0].idYearStudy;
         localStorage.setItem("selectedYear", findYear[0].idYearStudy);
      },
   },
};
</script>

<style lang="scss" scoped></style>
