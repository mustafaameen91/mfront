<template>
   <div>
      <v-dialog
         v-model="showEditDialog"
         persistent
         max-width="600px"
         width="600px"
      >
         <v-card>
            <v-toolbar dark color="primary">
               <v-btn icon dark @click="showEditDialog = false">
                  <v-icon>mdi-close</v-icon>
               </v-btn>
               <v-toolbar-title>تعديل كتاب الصادر</v-toolbar-title>
               <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text>
               <div style="margin-top: 10px"></div>
               <v-row>
                  <v-col cols="6">
                     <v-text-field
                        v-if="$store.state.user.sectionId != 2"
                        solo
                        v-model="dataToEdit.from"
                        label="من"
                     ></v-text-field>
                     <v-text-field
                        v-if="$store.state.user.sectionId == 2"
                        solo
                        v-model="dataToEdit.from"
                        label="جهة الاصدار"
                     ></v-text-field>
                     <v-autocomplete
                        v-model="dataToEdit.idArchiveSubject"
                        :items="$store.state.subjects"
                        item-text="subjectName"
                        item-value="idArchiveSubject"
                        solo
                        filled
                        label="الموضوع"
                     ></v-autocomplete>
                     <v-dialog
                        ref="dialog"
                        v-model="datePickerAddModel"
                        persistent
                        width="290px"
                     >
                        <template v-slot:activator="{ on, attrs }">
                           <v-text-field
                              v-if="$store.state.user.sectionId != 2"
                              v-model="dataToEdit.archiveDate"
                              type="date"
                              label="اختر التاريخ"
                              solo
                           ></v-text-field>
                           <v-text-field
                              v-if="$store.state.user.sectionId == 2"
                              v-model="dataToEdit.archiveDate"
                              label="تاريخ صادرة الكتاب الوارد"
                              data-date-format="DD MMMM YYYY"
                              solo
                              type="date"
                           ></v-text-field>
                        </template>
                        <v-date-picker v-model="addedDate" scrollable>
                           <v-spacer></v-spacer>
                           <v-btn
                              text
                              color="primary"
                              @click="datePickerAddModel = false"
                           >
                              الغاء
                           </v-btn>
                           <v-btn text color="primary" @click="getDates">
                              موافق
                           </v-btn>
                        </v-date-picker>
                     </v-dialog>
                  </v-col>
                  <v-col cols="6">
                     <v-text-field
                        solo
                        v-model="dataToEdit.to"
                        label="الى"
                        v-if="$store.state.user.sectionId != 2"
                     ></v-text-field>

                     <v-text-field
                        solo
                        v-model="dataToEdit.archiveNumber"
                        label="رقم صادرة الكتاب الوارد"
                        v-if="$store.state.user.sectionId == 2"
                     ></v-text-field>

                     <v-text-field
                        solo
                        v-model="dataToEdit.archiveNumber"
                        label="العدد"
                        v-if="$store.state.user.sectionId != 2"
                     ></v-text-field>
                     <v-file-input
                        multiple
                        label="الملفات"
                        solo
                        dense
                        v-model="files"
                        @change="getAllFiles"
                     ></v-file-input>
                  </v-col>
               </v-row>

               <v-textarea
                  solo
                  rows="3"
                  row-height="15"
                  name="input-7-4"
                  v-model="dataToEdit.subjectDescription"
                  label="نص الكتاب الواردة"
               ></v-textarea>

               <v-textarea
                  v-if="$store.state.user.sectionId != 2"
                  rows="3"
                  row-height="15"
                  solo
                  v-model="dataToEdit.note"
                  name="input-7-4"
                  label="الملاحظات"
               ></v-textarea>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
               <v-btn color="primary" text @click="confirmEdit"> حفظ </v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>

      <v-btn icon @click="showEditDialog = true">
         <v-icon color="primary"> mdi-pencil </v-icon>
      </v-btn>
   </div>
</template>

<script>
export default {
   props: {
      dataToEdit: Object,
   },
   data: () => ({
      datePickerAddModel: false,
      showEditDialog: false,
      addedDate: "",
      files: [],
   }),
   created() {
      console.log(this.dataToEdit);
   },

   //بمكان الوارد تصير البريد اليومي للعميد
   methods: {
      getAllFiles() {
         let self = this;
         if (this.files.length > 0) {
            let formData = new FormData();
            self.files.forEach((file, index) => {
               console.log(index);
               formData.append("files", file);
            });
            self.$http
               .post(`${self.$store.state.apiUrl}/uploadArchive`, formData)
               .then((res) => {
                  self.archiveImages = res.data;
                  console.log(res);
               });
         }
      },
      getDates() {
         this.datePickerSearchModel = false;
         this.datePickerAddModel = false;
      },
      confirmEdit() {
         let self = this;
         console.log(self.dataToEdit);

         if (
            self.dataToEdit.archiveDate &&
            self.dataToEdit.archiveNumber &&
            self.dataToEdit.idArchiveSubject &&
            self.dataToEdit.subjectDescription
         ) {
            self.dataToEdit.archiveDate = new Date(
               self.dataToEdit.archiveDate
            ).toISOString();

            self.dataToEdit.archiveDate = `${new Date(
               self.dataToEdit.archiveDate
            ).getFullYear()}-${
               new Date(self.dataToEdit.archiveDate).getMonth() + 1
            }-${new Date(self.dataToEdit.archiveDate).getDate()}`;

            self.dataToEdit.incomeDate = new Date(
               self.dataToEdit.incomeDate
            ).toISOString();

            self.dataToEdit.incomeDate = `${new Date(
               self.dataToEdit.incomeDate
            ).getFullYear()}-${
               new Date(self.dataToEdit.incomeDate).getMonth() + 1
            }-${new Date(self.dataToEdit.incomeDate).getDate()}`;

            self.$http
               .put(
                  `${self.$store.state.apiUrl}/archive/${self.dataToEdit.idArchive}`,
                  self.dataToEdit
               )
               .then((response) => {
                  this.$emit("reloadTask");
                  this.$toasted.success("تم تعديل البيانات");
                  self.showEditDialog = false;
               });
         } else {
            this.$toasted.success("الرجاء ملئ كافة الحقول");
         }
      },
   },
};
</script>

<style lang="scss" scoped></style>
