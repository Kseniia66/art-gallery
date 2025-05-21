import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery.ts";
import type { Painting, Author, Location } from "../types/painting.ts";

export const paintingsApi = createApi({
  reducerPath: "paintingsApi",
  baseQuery: axiosBaseQuery({ baseUrl: "https://test-front.framework.team/" }),
  endpoints: (builder) => ({
    getPaintings: builder.query<
      { data: Painting[]; total: number },
      { page: number; limit: number; q?: string }
    >({
      query: ({ page = 1, limit = 6, q = "" }) => ({
        url: "paintings",
        params: { _page: page, _limit: limit, q },
      }),
      transformResponse: (
        response: Painting[],
        meta?: { response?: { headers?: Record<string, string> } },
      ) => {
        const total = Number(meta?.response?.headers?.["x-total-count"]) || 0;
        return { data: response, total };
      },
    }),
  }),
});

export const authorsApi = createApi({
  reducerPath: "authorsApi",
  baseQuery: axiosBaseQuery({ baseUrl: "https://test-front.framework.team/" }),
  endpoints: (builder) => ({
    getAuthors: builder.query<Author[], void>({
      query: () => ({ url: "authors" }),
    }),
  }),
});

export const locationsApi = createApi({
  reducerPath: "locationsApi",
  baseQuery: axiosBaseQuery({ baseUrl: "https://test-front.framework.team/" }),
  endpoints: (builder) => ({
    getLocations: builder.query<Location[], void>({
      query: () => ({ url: "locations" }),
    }),
  }),
});

export const { useGetPaintingsQuery } = paintingsApi;
export const { useGetAuthorsQuery } = authorsApi;
export const { useGetLocationsQuery } = locationsApi;
