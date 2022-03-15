<template>
   <v-app>
      <v-app-bar app color="primary">
         <div class="d-flex align-center" style="width: 100%">
            <div>
               <v-icon large color="white">mdi-archive</v-icon>
               <span style="color: #d6e0f0"> الارشفة الالكترونية </span>
            </div>
            <v-spacer></v-spacer>
            <div>
               <v-list
                  class="justify-space-around d-flex"
                  dense
                  color="primary"
               >
                  <v-list-item-group v-model="selectedItem" class="d-flex">
                     <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        style="margin: 0 10px"
                        color="white"
                        @click="page(item)"
                     >
                        <v-list-item-icon>
                           <v-icon v-text="item.icon" color="white"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                           <v-list-item-title
                              v-text="item.text"
                              style="color: #ffffff"
                           ></v-list-item-title>
                        </v-list-item-content>
                     </v-list-item>
                  </v-list-item-group>
               </v-list>
            </div>

            <v-spacer></v-spacer>
            <div>
               <v-menu rounded="lg" offset-y>
                  <template v-slot:activator="{ attrs, on }">
                     <v-btn
                        elevation="0"
                        color="primary"
                        class="white--text"
                        v-bind="attrs"
                        v-on="on"
                     >
                        <v-icon left color="white"> mdi-account-circle </v-icon>
                        <span style="color: #d6e0f0; font-size: 12px">
                           اسم المستخدم
                        </span>
                     </v-btn>
                  </template>

                  <v-list style="padding: 0px">
                     <v-list-item link>
                        <v-list-item-title
                           style="color: #876445; font-size: 12px"
                        >
                           <v-icon left color="primary">
                              mdi-location-exit
                           </v-icon>
                           تسجيل خروج
                        </v-list-item-title>
                     </v-list-item>

                     <v-list-item
                        link
                        @click="$router.push('/settings').catch((e) => {})"
                     >
                        <v-list-item-title
                           style="color: #876445; font-size: 12px"
                        >
                           <v-icon left color="primary"> mdi-cogs </v-icon>
                           الاعدادات
                        </v-list-item-title>
                     </v-list-item>
                  </v-list>
               </v-menu>
            </div>
         </div>
      </v-app-bar>

      <v-main>
         <div style="margin-top: 50px">
            <router-view />
         </div>
      </v-main>
   </v-app>
</template>

<script>
export default {
   name: "App",

   data: () => ({
      selectedItem: 0,
      items: [
         { title: "/", text: "الرئيسية", icon: "mdi-home" },
         {
            title: "Outer",
            text: "الكتب الصادرة",
            icon: "mdi-archive-arrow-up",
         },
         {
            title: "Inner",
            text: "الكتب الواردة",
            icon: "mdi-archive-arrow-down",
         },
         {
            title: "Inside",
            text: "المذكرات الداخلية",
            icon: "mdi-archive-refresh",
         },
         { title: "Subjects", text: "المواضيع", icon: "mdi-post" },
      ],
      itemsMenu: [...Array(1)].map((_, i) => `Item ${i}`),
   }),

   created() {
      let self = this;

      let selectedYear = localStorage.getItem("selectedYear");

      if (selectedYear) {
         this.$store.state.selectedYear = selectedYear;
      } else {
         localStorage.setItem("selectedYear", 1);
         this.$store.state.selectedYear = 1;
      }

      this.$http
         .get(`${this.$store.state.apiUrl}/archiveSubjects`)
         .then((res) => {
            this.$store.state.subjects = res.data;
         });

      self.$http
         .get(`${self.$store.state.apiUrl}/archivesCount`)
         .then((res) => {
            console.log(res.data);
            let counters = {
               outer: res.data.filter((archive) => {
                  if (archive.archiveTypeId == 1) {
                     return archive;
                  }
               })[0].archiveCount,
               inner: res.data.filter((archive) => {
                  if (archive.archiveTypeId == 2) {
                     return archive;
                  }
               })[0].archiveCount,
               inside: res.data.filter((archive) => {
                  if (archive.archiveTypeId == 3) {
                     return archive;
                  }
               })[0].archiveCount,
               order: 0,
            };

            self.$store.state.counts = counters;
         });
   },
   methods: {
      page(item) {
         this.$router.push(item.title).catch(() => {});
      },
   },
};
</script>
<style>
@import url("./font.css");

body {
   background-color: #e4e4e4 !important;
}
.side-bar {
   color: red;
}
.warning-color,
.table-warning-color {
   color: #876445 !important;
}
.table-warning-color {
   background-color: #ffffff !important;
}
.table-warning-color tr th {
   color: #876445 !important;
}
</style>
