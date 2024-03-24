import { NextApiResponse } from "next";
import { toast } from "react-toastify";

import { api_url } from "./constants";

import { E_Locales } from "@/models";

export const toasterPending = <T>(
  method: Promise<T>,
  pending?: string,
  error?: string,
  success?: string
): Promise<T> => {
  return toast.promise(method, {
    pending: pending || "Loading...",
    error: {
      render({ data }) {
        return error || "Error";
      },
    },
    success: success || "Success",
  });
};

// testUtil();

export const resNotFound = (res: NextApiResponse<{ error: string }>) => {
  return res.status(404).json({ error: "Not Found" });
};

export const _return_promise_data = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  });
};

export const swrMutationCreator = async <T>(
  url: string,
  fetchOptions?: { method: string; body?: string }
): Promise<T> => {
  const fetcher = async (): Promise<T> => {
    const res = await fetch(url, fetchOptions);
    if (res.ok) {
      return await res.json();
    } else throw new Error(String(res.body));
  };
  return await toasterPending(fetcher());
};

export const getURL = (path: string): string => api_url + path;

export const fetcher = (url: string) =>
  fetch(getURL(url)).then((res) => res.json());
export const getFetcher = (query: string) => {
  return (url: string) => fetch(getURL(url) + query).then((res) => res.json());
};

export const getLocaleSafe = (l: string) => {
  if (Object.keys(E_Locales).includes(l)) return l as E_Locales;
  return E_Locales.ua;
};

export const lanEnumToObject = <T>(value: T): { [key in E_Locales]: T } => {
  return {
    en: value,
    ua: value,
    de: value,
  };
};

export const lineCut = (str: string, len: number): string => {
  if (str.length > len) return str.slice(0, len) + "...";
  return str;
};
