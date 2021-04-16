import store from "./store";


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // @ts-ignore
    $store: store;
  }
}
