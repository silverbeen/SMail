import {useMutation, useQuery} from "react-query";
import http from "../common";

export const USER_KEYS = {
  all: ["user"],
  lists: () => [...USER_KEYS.all, "list"],
  list: <T>(search: T) => [...USER_KEYS.lists(), {search}],
};

interface UserResponseDto {
  userId: number;
  userName: string;
}

export const useGetUser = (userId: string) => {
  return useQuery(
    USER_KEYS.lists(),
    () => http.get<UserResponseDto>(`/user/${userId}`),
    {
      enabled: !!userId,
      onSuccess: (res) => {
        localStorage.setItem("userId", String(res.userId));
        localStorage.setItem("username", res.userName);
      },
    }
  );
};
