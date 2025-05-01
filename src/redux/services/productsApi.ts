import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../types/products";

export const productsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
    tagTypes: ['Product'],
    endpoints: (builder) => {
        return {
            // Get All Products
            getProducts: builder.query<Product[], void>({
                query: () => '/products',
                providesTags: ['Product'],
                keepUnusedDataFor: 60,
            }),
            // Get Single Product
            getOneProduct: builder.query({
                query: (id) => `/products/${id}`
            }),
            // Add Product
            addProduct: builder.mutation({
                query: (newProductObj) => {
                    return {
                        url: '/products/add',
                        method: 'POST',
                        body: newProductObj
                    }
                },
                invalidatesTags: ['Product']
            }),

        }
    }
});

export const { useAddProductMutation, useGetProductsQuery, useGetOneProductQuery } = productsApi;
export default productsApi.reducer;