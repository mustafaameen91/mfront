<template>
   <div>
      <v-dialog v-model="show" persistent max-width="600px" width="600px">
         <v-card>
            <v-toolbar dark color="primary">
               <v-btn icon dark @click="show = false">
                  <v-icon>mdi-close</v-icon>
               </v-btn>
               <v-toolbar-title>اضافة كتاب الصادر</v-toolbar-title>
               <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text>
               <div style="margin-top: 10px"></div>
               <v-row>
                  <v-col cols="6">
                     <v-text-field
                        v-if="$store.state.user.sectionId != 2"
                        solo
                        v-model="from"
                        label="من"
                     ></v-text-field>
                     <v-text-field
                        v-if="$store.state.user.sectionId == 2"
                        solo
                        v-model="from"
                        label="اسم الدائرة الموجه لها الكتاب "
                     ></v-text-field>

                     <v-autocomplete
                        v-model="archiveSubject"
                        :items="$store.state.subjects"
                        item-text="subjectName"
                        item-value="idArchiveSubject"
                        solo
                        dense
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
                              v-model="addedDate"
                              type="date"
                              label="اختر التاريخ"
                              solo
                           ></v-text-field>

                           <v-text-field
                              v-if="$store.state.user.sectionId == 2"
                              v-model="addedDate"
                              label="تاريخ الصادر"
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
                        v-model="to"
                        label="الى"
                        v-if="$store.state.user.sectionId != 2"
                     ></v-text-field>
                     <v-text-field
                        v-if="$store.state.user.sectionId != 2"
                        solo
                        v-model="archiveNumber"
                        label="العدد"
                     ></v-text-field>
                     <v-text-field
                        v-if="$store.state.user.sectionId == 2"
                        solo
                        v-model="archiveNumber"
                        label="رمز الصادر"
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
                  v-model="archiveDescription"
                  label="نص الكتاب الصادر"
               ></v-textarea>

               <v-textarea
                  v-if="$store.state.user.sectionId != 2"
                  rows="3"
                  row-height="15"
                  solo
                  v-model="note"
                  name="input-7-4"
                  label="الملاحظات"
               ></v-textarea>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
               <v-btn color="primary" text @click="saveOuterData"> حفظ </v-btn>
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
               @click="show = true"
               v-bind="attrs"
               v-on="on"
            >
               <v-icon dark> mdi-plus </v-icon>
            </v-btn>
         </template>
         <span>اضافة كتاب صادر</span>
      </v-tooltip>
   </div>
</template>

<script>
export default {
   data: () => ({
      studentRequiredFormRules: [(v) => !!v || "حقل مطلوب . يرجى ادخال قيمة"],
      datePickerAddModel: false,
      items: [],
      show: false,
      addedDate: "",
      archiveSubject: "",
      archiveDescription: "",
      note: "",
      from: "",
      to: "",
      archiveNumber: "",
      yearStudyId: "",
      files: [],
      dates: [],
   }),
   created() {
      let x = new Date();
      console.log(x);
   },
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
                  self.snackbar = true;
                  self.text = "تم اضافة الصور";
                  self.archiveImages = res.data;
                  console.log(res);
               });
         }
      },
      getDates() {
         this.datePickerSearchModel = false;
         this.datePickerAddModel = false;
      },
      saveOuterData() {
         let self = this;
         if (
            self.$store.state.user.sectionId != 2 &&
            self.addedDate &&
            self.archiveSubject &&
            self.note &&
            self.archiveDescription &&
            self.from &&
            self.to &&
            self.archiveNumber
         ) {
            let innerData = {
               from: self.from,
               to: self.to,
               archiveDate: `${new Date(self.addedDate).getFullYear()}-${
                  new Date(self.addedDate).getMonth() + 1
               }-${new Date(self.addedDate).getDate()}`,
               archiveSubjectId: self.archiveSubject,
               archiveNumber: self.archiveNumber,
               subjectDescription: self.archiveDescription,
               note: self.note,
               sectionId: self.$store.state.user.sectionId,
               archiveTypeId: 1,
               yearStudyId: self.yearStudyId,
            };

            self.$http
               .post(`${self.$store.state.apiUrl}/addArchive`, innerData)
               .then((res) => {
                  if (self.archiveImages.images.length > 0) {
                     let images = self.archiveImages.images.map((image) => {
                        return {
                           imagePath: image.imagePath,
                           archiveId: res.data.idArchive,
                        };
                     });
                     self.$http
                        .post(
                           `${self.$store.state.apiUrl}/addArchiveImages`,
                           images
                        )
                        .then((resImages) => {
                           self.snackbar = true;
                           self.text = "تم اضافة البيانات";
                           self.initialData();
                           console.log(resImages);
                        });
                  } else {
                     self.snackbar = true;
                     self.text = "تم اضافة البيانات";
                     self.initialData();
                     console.log(res);
                  }
               });
         } else if (
            self.$store.state.user.sectionId == 2 &&
            self.addedDate &&
            self.archiveSubject &&
            self.from &&
            self.archiveNumber
         ) {
            self.addedDate = `${new Date(self.addedDate).getFullYear()}-${
               new Date(self.addedDate).getMonth() + 1
            }-${new Date(self.addedDate).getDate()}`;

            let innerData = {
               from: self.from,
               to: "الادارية",
               archiveDate: self.addedDate,
               archiveSubjectId: self.archiveSubject,
               archiveNumber: self.archiveNumber,
               subjectDescription: self.archiveDescription,
               note: "لايوجد",
               sectionId: self.$store.state.user.sectionId,
               archiveTypeId: 1,
               yearStudyId: self.$store.state.selectedYear,
               incomeDate: self.addedDate,
               incomeNumber: "0",
            };
            self.$http
               .post(`${self.$store.state.apiUrl}/addArchive`, innerData)
               .then((res) => {
                  console.log(res.data);
                  this.$toasted.success("تم اضافه البيانات");
                  this.$emit("reloadTask");
               });
         } else {
            this.$toasted.success("الرجاء ملئ كافة الحقول");
         }

         this.show = false;
      },
   },
};
</script>

<style lang="scss" scoped></style>
