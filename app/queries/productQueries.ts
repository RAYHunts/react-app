
import { useFetch } from '~/hooks/useFetch';
import type { Product, ProductResponseApi } from '~/types/product.type';

interface getProductsProps {
    sortBy?: string[]
    query?: string
    limit?: number
    skip?: number
    page?: number
}
export const getProducts = (props: getProductsProps) => {
    let apiUrl = "https://dummyjson.com/products";

    if (props.sortBy) {
        apiUrl += `?sortBy=${props.sortBy.join(',')}`;
    }

    if (props.limit) {
        apiUrl += `?limit=${props.limit}`;
    }

    if (props.skip) {
        apiUrl += `?skip=${props.skip}`;
    }

    if (props.query) {
        apiUrl += `/search?q=${props.query}`;
    }

    return useFetch<ProductResponseApi>(apiUrl);

};
