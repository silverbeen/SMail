import requset from "./common";

export default {
  getContent(id: any) {
    return requset({
      url: `content?id=${id}`,
    });
  },
};
