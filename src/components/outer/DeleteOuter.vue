<template>
   <div>
      <v-dialog
         v-model="showDeleteDialog"
         persistent
         max-width="600px"
         width="600px"
      >
         <v-card>
            <v-toolbar dark color="error">
               <v-btn icon dark @click="showDeleteDialog = false">
                  <v-icon>mdi-close</v-icon>
               </v-btn>
               <v-toolbar-title> تأكيد حذف</v-toolbar-title>
               <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text>
               <div style="margin: 15px">
                  <h3 style="color: #ff6b6b">هل انت متأكد من حذف البيانات ؟</h3>
                  <h5>عند الحذف البيانات لا يمكن استعادتها لاحقاً!</h5>
               </div>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
               <v-btn color="error" text @click="confirmDelete"> حذف </v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
      <v-icon @click="showDeleteDialog = true" color="primary">
         mdi-delete
      </v-icon>
   </div>
</template>

<script>
export default {
   props: {
      dataToDelete: Object,
   },
   data: () => ({
      datePickerAddModel: false,
      showDeleteDialog: false,
      addedDate: "",
      files: [],
   }),
   methods: {
      confirmDelete() {
         let self = this;
         self.$http
            .delete(
               `${self.$store.state.apiUrl}/archive/${self.dataToDelete.idArchive}`
            )
            .then((res) => {
               console.log(res.data);
               this.$toasted.error("تم حذف البيانات");
               self.showDeleteDialog = false;
               this.$emit("reloadTask");
            });
      },
   },
};
</script>

<style lang="scss" scoped></style>
