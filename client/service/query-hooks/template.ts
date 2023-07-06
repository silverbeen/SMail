import {useMutation, useQuery, useQueryClient} from "react-query";
import http from "../common";
import {ToastSuccess} from "../../lib/function/toast";
import {CONTENT_KEYS} from "./content";

export const TEMPLATE_KEYS = {
  all: ["template"],
  lists: () => [...TEMPLATE_KEYS.all, "list"],
  list: <T>(search: T) => [...TEMPLATE_KEYS.lists(), {search}],
};

export interface TemplateResponseDto {
  id: number;
  title: string;
  content: string;
}

export interface CreateTemplateRequestDto {
  title: string;
  content: string;
}

export const useGetTemplate = () => {
  return useQuery(TEMPLATE_KEYS.list({}), () =>
    http.get<TemplateResponseDto[]>(`/template`)
  );
};

export const usePostTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: CreateTemplateRequestDto) => http.post("/template", data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(TEMPLATE_KEYS.lists());
        ToastSuccess("템플릿이 추가되었어요.");
      },
    }
  );
};

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation((id: number) => http.delete(`/template/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(TEMPLATE_KEYS.lists());
      ToastSuccess("템플릿이 삭제되었어요.");
    },
  });
};
