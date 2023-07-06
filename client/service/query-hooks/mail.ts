import {useMutation, useQuery} from "react-query";
import http from "../common";
import {ToastSuccess} from "../../lib/function/toast";

export const MAIL_KEYS = {
  all: ["mails"],
  lists: () => [...MAIL_KEYS.all, "list"],
  list: <T>(search: T) => [...MAIL_KEYS.lists(), {search}],
};

interface MailResponseDto {
  mailTitle: string;
  mailContent: string;
}

interface PostMailRequestDto {
  title: string;
  content: string;
}

export const useGetMails = () => {
  return useQuery(MAIL_KEYS.lists(), () => http.get<MailResponseDto>(`/mail`));
};

export const usePostMail = () => {
  return useMutation((data: PostMailRequestDto) => http.post("mail", data), {
    onSuccess: () => {
      ToastSuccess("메일을 저장했습니다.");
    },
  });
};
