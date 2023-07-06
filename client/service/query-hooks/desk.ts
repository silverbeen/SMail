import {useMutation, useQuery, useQueryClient} from "react-query";
import http from "../common";
import {ToastSuccess} from "../../lib/function/toast";
import {CONTENT_KEYS} from "./content";

export const DESK_KEYS = {
  all: ["desks"],
  lists: () => [...DESK_KEYS.all, "list"],
  list: <T>(search: T) => [...DESK_KEYS.lists(), {search}],
};

export interface DeskResponseDto {
  userDeskId: number;
  deskContent: DeskContentResponseDto[];
}

export interface DeskContentResponseDto {
  content: string;
  id: number;
  contentId: number;
}

export const useGetDesk = () => {
  return useQuery(DESK_KEYS.list({}), () =>
    http.get<DeskResponseDto>(`/userdesk`)
  );
};

export const usePostDesk = () => {
  const queryClient = useQueryClient();

  return useMutation((id: number) => http.post("/userdesk", id), {
    onSuccess: () => {
      queryClient.invalidateQueries(DESK_KEYS.lists());
      queryClient.invalidateQueries(CONTENT_KEYS.lists());
      ToastSuccess("문구가 서랍에 추가되었어요.");
    },
  });
};

export const useDeleteDesk = () => {
  const queryClient = useQueryClient();

  return useMutation((deskId: number) => http.delete(`/userdesk/${deskId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(DESK_KEYS.lists());
      queryClient.invalidateQueries(CONTENT_KEYS.lists());
      ToastSuccess("문구가 서랍에서 삭제되었어요.");
    },
  });
};
