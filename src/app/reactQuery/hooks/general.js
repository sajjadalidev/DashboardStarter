import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  SIGNUP_MUT,
  LOGIN_MUT,
  LOG_OUT_MUT,
  GET_ALL_CITIES,
  GET_ALL_STATES,
} from "./keys";
import generalServices from "../services/general";
import { queryClient } from "./index";

export const useLogin = (history) => {
  const res = useMutation(LOGIN_MUT, generalServices.login, {
    onSuccess: (data) => {},
    onError: (data) => {
      console.log(data);
    },
  });
  return res;
};
export const useLogout = (history) => {
  const res = useQuery(LOG_OUT_MUT, generalServices.logOut, {
    onSuccess: (data) => {},
  });
  return res;
};
export const useSignUp = () => {
  const res = useQuery(SIGNUP_MUT, generalServices.signUp, {
    onSuccess: (data) => {},
  });
  return res;
};

// Get All Cities & States for Dropdown in all form

export const useGetAllCities = () => {
  const [state, setCustomState] = useState("");
  const res = useQuery(
    [GET_ALL_CITIES, state],
    () => generalServices.getCities(state),
    {
      select: ({ data }) => {
        return data;
      },
      initialData: [],
      enabled: state ? true : false,
    }
  );
  return { ...res, setCustomState };
};

export const useGetAllStates = () => {
  const res = useQuery(GET_ALL_STATES, generalServices.getStates, {
    select: ({ data }) => {
      return data;
    },
    initialData: [],
  });
  return res;
};
