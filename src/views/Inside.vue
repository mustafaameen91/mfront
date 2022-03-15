<template>
   <div>
      <v-container class="container" fluid>
         <v-card color="accent" elevation="6">
            <v-row style="margin: 10px">
               <v-col cols="10">
                  <h3 class="warning-color">صفحة المذكرات الداخلية</h3>
               </v-col>

               <v-col cols="2" style="text-align: center">
                  <AddInner
                     @reloadTask="initialData()"
                     style="display: inline-block"
                  />

                  <SearchInner
                     style="display: inline-block"
                     @clicked="onSearch"
                  />
               </v-col>
            </v-row>
         </v-card>
      </v-container>
      <v-container class="container" fluid>
         <v-card color="accent" elevation="6">
            <v-card-title class="warning-color">
               المذكرات الداخلية
               <v-spacer></v-spacer>
               <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="بحث"
                  single-line
                  hide-details
                  solo
               ></v-text-field>
            </v-card-title>
            <v-data-table
               :headers="headers"
               :items="ItemsFilter"
               :items-per-page="15"
               class="table-content table-warning-color"
            >
               <template v-slot:item.isActive="{ item, index }">
                  <v-avatar size="20" color="success" v-if="item.isActive == 1">
                  </v-avatar>

                  <v-avatar size="20" color="error" v-else> </v-avatar>
               </template>

               <template v-slot:item.index="{ item, index }">
                  <h4 style="padding: 0 3px">{{ index + 1 }}</h4>
               </template>
               <template v-slot:item.image="{ item, index }">
                  <v-avatar size="32" v-if="item.image != null">
                     <img :src="item.image" alt="John" />
                  </v-avatar>

                  <v-avatar size="32" color="indigo" v-else>
                     <v-icon dark> mdi-account-circle </v-icon>
                  </v-avatar>
               </template>
               <template v-slot:item.actions="{ item }">
                  <EditInner
                     style="display: inline-block"
                     :dataToEdit="item"
                     @reloadTask="initialData()"
                  />
                  <v-btn icon @click="dialog = false">
                     <DeleteInner
                        :dataToDelete="item"
                        @reloadTask="initialData()"
                     />
                  </v-btn>
               </template>
            </v-data-table>
         </v-card>
      </v-container>
   </div>
</template>

<script>
import AddInner from "../components/inner/AddInner.vue";
import EditInner from "../components/inner/EditInner.vue";
import SearchInner from "../components/inner/SearchInner.vue";
import DeleteInner from "../components/inner/DeleteInner.vue";
export default {
   components: {
      AddInner,
      SearchInner,
      EditInner,
      DeleteInner,
   },
   data: () => ({
      items: [],
      search: "",
      headers: [
         { text: "العدد", value: "archiveNumber" },
         { text: "التاريخ", value: "archiveDate" },
         { text: "عدد الوارد", value: "incomeNumber" },
         { text: "تاريخ الوارد", value: "incomeDate" },
         { text: "النص", value: "subjectDescription" },
         { text: "من", value: "from" },
         { text: "الى", value: "to" },
         { text: "ملاحظات", value: "note" },
         {
            text: "الموضوع",
            align: "start",
            sortable: false,
            value: "archiveSubject",
         },

         { text: "الاجراءات", value: "actions" },
      ],
   }),
   created() {
      let self = this;
      if (self.$store.state.user.sectionId == 2) {
         console.log(self.$store.state.user);

         self.headers = [
            { text: "رقم الوارد", value: "index" },
            { text: "تاريخ الوارد", value: "createdAtFormatted" },
            { text: "جهة الاصدار", value: "from" },
            { text: "رقم صادرة الكتاب الوارد", value: "archiveNumber" },
            {
               text: "تاريخ صادرة الكتاب الوارد",
               value: "archiveDateFormatted",
            },
            {
               text: "الموضوع",
               align: "start",
               value: "subjectName",
            },
            {
               text: "نص الكتاب",
               value: "subjectDescription",
            },
            { text: "الاجراءات", value: "actions" },
         ];
      }
      this.initialData();
   },
   methods: {
      onSearch(value) {
         console.log(value);
         this.items = value;
      },
      initialData() {
         let self = this;
         self.$http
            .get(
               `${self.$store.state.apiUrl}/searchArchive?archiveTypeId=2&sectionId=${self.$store.state.user.sectionId}&yearStudyId=${self.$store.state.selectedYear}`
            )
            .then((res) => {
               console.log(res.data);
               self.items = res.data;
            });
      },
   },
   computed: {
      ItemsFilter() {
         if (this.search) {
            return this.items.filter((item) => {
               return this.search
                  .toLowerCase()
                  .split(" ")
                  .every((v) => item.from.toLowerCase().includes(v));
            });
         } else {
            return this.items;
         }
      },
   },
};
</script>

<style lang="scss" scoped></style>
