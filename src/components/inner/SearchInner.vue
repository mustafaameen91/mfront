<template>
   <div>
      <v-dialog
         v-model="searchDialog"
         persistent
         max-width="600px"
         width="600px"
      >
         <v-card>
            <v-toolbar dark color="primary">
               <v-btn icon dark @click="searchDialog = false">
                  <v-icon>mdi-close</v-icon>
               </v-btn>
               <v-toolbar-title>بحث في الصادر</v-toolbar-title>
               <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text>
               <div style="margin-top: 10px"></div>
               <v-autocomplete
                  v-model="subjectSearch"
                  :items="$store.state.subjects"
                  item-text="subjectName"
                  item-value="idArchiveSubject"
                  solo
                  filled
                  label="الموضوع"
               ></v-autocomplete>

               <v-row>
                  <v-col cols="12" sm="6">
                     <v-dialog
                        ref="dialog"
                        v-model="datePickerSearchModel"
                        persistent
                        width="290px"
                     >
                        <template v-slot:activator="{ on, attrs }">
                           <v-text-field
                              v-model="dateRangeText"
                              label="اختر التاريخ من - الى"
                              readonly
                              solo
                              v-bind="attrs"
                              v-on="on"
                           ></v-text-field>
                        </template>
                        <v-date-picker v-model="dates" scrollable range>
                           <v-spacer></v-spacer>
                           <v-btn
                              text
                              color="primary"
                              @click="datePickerSearchModel = false"
                           >
                              الغاء
                           </v-btn>
                           <v-btn text color="primary" @click="getDates">
                              موافق
                           </v-btn>
                        </v-date-picker>
                     </v-dialog>
                  </v-col>
                  <v-col cols="12" sm="6">
                     <v-text-field
                        solo
                        label="العدد"
                        v-model="numberSearch"
                     ></v-text-field>
                  </v-col>
               </v-row>
               <v-row>
                  <v-col>
                     <v-text-field
                        solo
                        label="النص"
                        v-model="subjectDescriptionInfo"
                     ></v-text-field>
                  </v-col>
               </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
               <v-btn color="primary" text @click="searchData"> بحث </v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>

      <v-tooltip bottom>
         <template v-slot:activator="{ on, attrs }">
            <v-btn
               class="mx-2"
               fab
               small
               color="primary"
               @click="searchDialog = true"
               v-bind="attrs"
               v-on="on"
            >
               <v-icon> mdi-magnify </v-icon>
            </v-btn>
         </template>
         <span>بحث</span>
      </v-tooltip>
   </div>
</template>

<script>
export default {
   data: () => ({
      searchDialog: false,
      datePickerSearchModel: false,
      subjectSearch: "",
      numberSearch: "",
      subjectDescriptionInfo: "",
      addedDate: "",
      dates: [],
   }),
   created() {
      console.log(this.$store.state.subjects);
   },
   methods: {
      searchData() {
         let self = this;
         let query = "";

         if (self.dates.length > 0) {
            query += `&dates=${JSON.stringify(self.dates)}`;
         }

         if (self.numberSearch) {
            query += `&numberSearch=${self.numberSearch}`;
         }

         if (self.subjectSearch) {
            query += `&subjectSearch=${self.subjectSearch}`;
         }

         if (self.subjectDescriptionInfo) {
            query += `&subjectDescription=${self.subjectDescriptionInfo}`;
         }

         query += `&sectionId=${self.$store.state.user.sectionId}`;

         self.$http
            .get(
               `${self.$store.state.apiUrl}/searchArchive?archiveTypeId=2${query}`
            )
            .then((res) => {
               console.log(res.data);
               this.$emit("clicked", res.data);
            });

         this.searchDialog = false;
      },
      getDates() {
         this.datePickerSearchModel = false;
         this.datePickerAddModel = false;
      },
   },
   computed: {
      dateRangeText() {
         return this.dates.length > 0
            ? this.dates.join(" - ")
            : "تاريخ الكتاب من - الى";
      },
      innerDate() {
         return this.addedDate;
      },
   },
};
</script>

<style lang="scss" scoped></style>
