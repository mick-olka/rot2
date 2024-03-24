import { Pagination } from "@mui/material";

import { ProductsList } from "./products-list";
import s from "./products.module.scss";

import { useGetProductsList, usePaginator } from "@/hooks";
import { MainLayout } from "@/layouts";
import { E_Locales } from "@/models";

export const ProductsPage = ({
  locale,
  text,
}: {
  locale: E_Locales;
  text: { dollar: string; main_text: string };
}) => {
  const { page, onPageChange } = usePaginator();
  const { data } = useGetProductsList(Number(page));
  const handlePageChange = (e: unknown, p: number) => {
    onPageChange(p);
  };

  return (
    <MainLayout description="Products Page" title="Products">
      {text && <h2 className={s.text}>{text.main_text}</h2>}
      <ProductsList list={data.docs} locale={locale} text={text} />
      <Pagination
        count={Math.ceil(data.count / 21)}
        page={page}
        onChange={handlePageChange}
        size="large"
        sx={{ margin: "1rem auto", width: "fit-content" }}
      />
    </MainLayout>
  );
};
