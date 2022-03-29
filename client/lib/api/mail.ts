import requset from "./common";

export default {
  getMail() {
    return requset({
      url: "mail",
    });
  },
  postMail(data: { title: string; content: string }) {
    return requset({
      url: "mail",
      method: "post",
      data: { title: data.title, content: data.content },
    });
  },
};
