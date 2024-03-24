import { useEffect } from "react";
import useSWR, { mutate } from "swr";

import {
  I_Product,
  I_ProductExtended,
  I_ProductsListRes,
  I_SWR_Fallback,
} from "@/models";
import { E_ApiPaths } from "@/utils/constants";
import { fetcher, getFetcher, getURL } from "@/utils/helpers";

const path = E_ApiPaths.products;

// for preload
export const getProductsList = async (): Promise<I_ProductsListRes> => {
  const res = await fetch(getURL(path + "?limit=21"));
  if (res.ok) {
    return await res.json();
  } else throw new Error(String(res.body));
};

// for general use
export const useGetProductsList = (p = 1) => {
  const data = useSWR<I_ProductsListRes>(
    path,
    getFetcher(`?limit=21&page=${p}`),
    {
      // refreshInterval: 50,
    }
  );
  useEffect(() => {
    mutate(path);
  }, [p]);
  return data as I_SWR_Fallback<I_ProductsListRes>;
};

export const useSearchProductsList = (regex: string) => {
  const query = `?limit=21&page=1&regex=${regex}`;
  const { data } = useSWR<I_ProductsListRes>(path + query, fetcher, {
    // refreshInterval: 50,
  });
  useEffect(() => {
    mutate(path);
  }, [regex]);
  return data;
};

export const getProductById = async (id: string): Promise<I_Product | null> => {
  const res = await fetch(getURL(path) + id);
  if (res.ok) {
    return await res.json();
  } else return null;
  // } else throw new Error(String(res.body))
};

export const useGetProductById = (id: string) => {
  const data = useSWR<I_ProductExtended>(path + id, fetcher);
  return data as I_SWR_Fallback<I_ProductExtended>;
};
