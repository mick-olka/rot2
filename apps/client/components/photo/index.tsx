import { Box, SxProps } from "@mui/material";
import Image from "next/image";
import React from "react";

import { photo_url } from "@/utils";

export const Photo = ({
  src,
  sizes,
  sx,
  alt,
  title,
}: {
  alt?: string;
  title?: string;
  src: string;
  sizes?: string;
  sx?: SxProps;
}) => {
  return (
    <Box
      sx={{
        width: "140px",
        height: "100px",
        bgcolor: "#fff",
        position: "relative",
        border: "10px solid #fff",
        ...sx,
      }}
    >
      <Image
        src={photo_url + src}
        alt={alt || "photo"}
        title={title}
        fill
        sizes={sizes}
        priority
        style={{ objectFit: "contain" }}
      />
    </Box>
  );
};
