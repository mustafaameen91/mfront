<template>
   <div>
      <v-container class="container" fluid>
         <v-card color="accent" elevation="6">
            <v-row style="margin: 10px">
               <v-col cols="10">
                  <h3 class="warning-color">صفحة الكتب الصادرة</h3>
               </v-col>

               <v-col cols="2" style="text-align: center">
                  <AddOuter
                     @reloadTask="initialData()"
                     style="display: inline-block"
                  />

                  <SearchOuter
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
               الصادرة
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
                  <EditOuter
                     style="display: inline-block"
                     :dataToEdit="item"
                     @reloadTask="initialData()"
                  />
                  <v-btn icon @click="dialog = false">
                     <DeleteOuter
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
import AddOuter from "../components/outer/AddOuter.vue";
import EditOuter from "../components/outer/EditOuter.vue";
import SearchOuter from "../components/outer/SearchOuter.vue";
import DeleteOuter from "../components/outer/DeleteOuter.vue";
export default {
   components: {
      AddOuter,
      SearchOuter,
      EditOuter,
      DeleteOuter,
   },
   data: () => ({
      items: [],
      search: "",
      headers: [
         { text: "العدد", value: "archiveNumber" },
         { text: "التاريخ", value: "archiveDateFormatted" },
         { text: "عدد الصادر", value: "incomeNumber" },
         { text: "تاريخ الصادر", value: "incomeDateFormatted" },
         { text: "النص", value: "subjectDescription" },
         { text: "من", value: "from" },
         { text: "الى", value: "to" },
         { text: "ملاحظات", value: "note" },
         {
            text: "الموضوع",
            align: "start",
            sortable: false,
            value: "subjectName",
         },

         { text: "الاجراءات", value: "actions" },
      ],
   }),
   created() {
      let self = this;
      if (self.$store.state.user.sectionId == 2) {
         console.log(self.$store.state.user);

         self.headers = [
            { text: "رمز الصادر", value: "archiveNumber" },
            { text: "رقم الصادر", value: "index" },
            { text: "تاريخ الصادر", value: "archiveDateFormatted" },
            { text: "اسم الدائرة الموجه لها الكتاب ", value: "from" },
            {
               text: "موضوع الكتاب",
               align: "start",
               sortable: false,
               value: "subjectName",
            },
            {
               text: "نص الكتاب الصادر",
               align: "start",
               sortable: false,
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
               `${self.$store.state.apiUrl}/searchArchive?archiveTypeId=1&sectionId=${self.$store.state.user.sectionId}&yearStudyId=${self.$store.state.selectedYear}`
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
