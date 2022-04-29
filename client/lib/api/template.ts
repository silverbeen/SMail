import { TemplateType } from "../../@types/TemplateTypes";
import requset from "./common";

export default {
  getTemplate() {
    return requset({
      url: "template",
    });
  },
  createTemplate(data: TemplateType) {
    return requset({
      url: "template",
      method: "POST",
      data: data,
    });
  },
  deleteDesk(id: number) {
    return requset({
      url: "template",
      method: "DELETE",
      data: { template_id: id },
    });
  },
};
