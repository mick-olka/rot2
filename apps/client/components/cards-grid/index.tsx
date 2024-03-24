import { Grid } from "@mui/material";
import { ReactNode } from "react";

import s from "./cards-grid.module.scss";

import { SquareCard } from "../card";

export const CardsGrid = <T extends { _id: string }>({
  items,
  renderItem,
  cardHeight,
}: {
  items: T[];
  renderItem: (item: T) => ReactNode;
  cardHeight?: string;
}) => {
  return (
    <Grid
      container
      spacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ justifyContent: "center" }}
    >
      {items.map((item) => (
        <Grid item xl={3} lg={4} md={5} sm={6} xs={6} key={item._id}>
          <SquareCard height={cardHeight}>{renderItem(item)}</SquareCard>
        </Grid>
      ))}
    </Grid>
  );
};
