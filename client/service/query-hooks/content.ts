import {useMutation, useQuery} from "react-query";
import http from "../common";

export const CONTENT_KEYS = {
  all: ["content"],
  lists: () => [...CONTENT_KEYS.all, "list"],
  list: <T>(search: T) => [...CONTENT_KEYS.lists(), {search}],
};

export interface ContentResponseDto {
  contentId: number;
  fieldId: number;
  content: string;
  title?: string;
  id: number;
  saved: boolean;
}

export interface DeskContentResponseDto {
  id: number;
  content: string;
  content_id: string;
}

export const useGetContents = (contentId: number) => {
  return useQuery(
    CONTENT_KEYS.lists(),
    () => http.get<ContentResponseDto[]>(`/content`, {id: contentId}),
    {enabled: !!contentId}
  );
};
