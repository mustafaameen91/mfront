import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
   rtl: true,
   theme: {
      themes: {
         light: {
            primary: "#926C4B",
            secondary: "#d6e0f0",
            background: "#e4e4e4",
            accent: "#ffffff",
            error: "#ff6b6b",
            dark: "#1e1e1e",
            info: "#2189e8",
            stepper: "#E6F8F7",
            success: "#1b998b",
            warning: "#876445",
         },
         dark: {
            primary: "#363636",
            secondary: "#d6e0f0",
            background: "#fff",
            accent: "#006a71",
            error: "#ff6b6b",
            info: "#2196F3",
            dark: "#363636",
            stepper: "#ebffeb",
            success: "#1b998b",
            warning: "#ffe66d",
         },
      },
   },
});
