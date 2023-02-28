import RxAxios, { rxAxios } from "./RxAxios";

export * from "./sum";

const get = rxAxios.get;
const post = rxAxios.post;
export { RxAxios, get, post };
