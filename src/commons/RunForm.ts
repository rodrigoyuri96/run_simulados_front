import {Vue} from "vue/types/vue";

type RunForm = Vue & { validate: () => boolean }

export type {RunForm}
