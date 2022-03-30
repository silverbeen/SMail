import requset from "./common";

export default {
  getDesk() {
    return requset({
      url: "userdesk",
    });
  },
  postDesk(id: number) {
    return requset({
      url: "userdesk",
      method: "POST",
      data: { contentId: id },
    });
  },
  deleteDesk(id: number) {
    return requset({
      url: "userdesk",
      method: "DELETE",
      data: { id },
    });
  },
};
