<template>
   <div>
      <v-container class="container" fluid>
         <v-card color="accent" elevation="6">
            <v-row style="margin: 10px">
               <v-col cols="10">
                  <h3 class="warning-color">صفحة المواضيع</h3>
               </v-col>

               <v-col cols="2">
                  <AddSection @reloadTask="initialData()" />
               </v-col>
            </v-row>
         </v-card>
      </v-container>
      <v-container class="container" fluid>
         <v-card color="accent" elevation="6">
            <v-card-title class="warning-color">
               المواضيع
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
               :items="items"
               :items-per-page="5"
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
                  <EditSection
                     style="display: inline-block"
                     :item="item"
                     @reloadTask="initialData()"
                  />
                  <v-btn icon @click="dialog = false">
                     <v-icon @click="deleteItem(item)" color="primary">
                        mdi-delete
                     </v-icon>
                  </v-btn>
               </template>
            </v-data-table>
         </v-card>
      </v-container>
   </div>
</template>

<script>
export default {
   data: () => ({
      items: [],
      headers: [
         { text: "التسلسل", value: "index" },
         { text: "التاريخ", value: "createdAt" },
         { text: "اسم الموضوع", value: "subjectName" },
         { text: "الاجراءات", value: "actions" },
      ],
   }),
   created() {
      this.initialData();
   },
   methods: {
      initialData() {
         let self = this;
         self.$http
            .get(`${self.$store.state.apiUrl}/archiveSubjects`)
            .then((res) => {
               console.log(res.data);
               self.items = res.data;
            });
      },
   },
};
</script>

<style lang="scss" scoped></style>
