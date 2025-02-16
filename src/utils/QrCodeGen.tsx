import * as React from "react";
import { QRCodeSVG } from "qrcode.react";

import { Stack, Typography } from "@mui/material";

interface IQRCodeGenProps {
  value: string;
}

const QRCodeGen: React.FunctionComponent<IQRCodeGenProps> = ({ value }) => {
  return (
    <Stack>
      <Typography variant="caption">QR Code</Typography>
      <QRCodeSVG value={value} />
    </Stack>
  );
};

export default QRCodeGen;
