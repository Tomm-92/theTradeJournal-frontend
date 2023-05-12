import { SwitchTransition } from "react-transition-group";
import { Fade, TableCell, TableRow, Box, Avatar } from "@mui/material";
import { numberFormat } from "./hooks-helpers";
const BodyRow = ({ row }) => {
  const { name, quote } = row;
  const USD = quote.USD;
  const price = numberFormat(USD.price, "currency");
  const percent_24 = USD.percent_change_24h.toFixed(2);
  const percent_7d = USD.percent_change_7d.toFixed(2);
  const circulating_supply = numberFormat(row.circulating_supply, {
    style: "decimal",
  });
  const marketCap = numberFormat(USD.market_cap, {
    notation: "compact",
    compactDisplay: "short",
  });
  const volume_24 = numberFormat(USD.volume_24h);

  return (
    <TableRow sx={{ "& td": { width: 20 } }}>
      <TableCell
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            position: "sticky",
            left: 0,
            zIndex: 10,
            backgroundColor: "#121212",
          },
        })}
      >
        {row.cmc_rank}
      </TableCell>
      <TableCell
        padding="none"
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            position: "sticky",
            left: 48,
            zIndex: 10,
            backgroundColor: "#121212",
          },
        })}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${row.id}.png`}
            sx={{
              width: 25,
              height: 25,
              mr: 1,
            }}
          />
          <span>
            {name}&nbsp;{row.symbol}
          </span>
        </Box>
      </TableCell>
      <SwitchTransition>
        <Fade key={price}>
          <TableCell align="right">{price}</TableCell>
        </Fade>
      </SwitchTransition>
      <SwitchTransition>
        <Fade key={percent_24}>
          <TableCell align="right">{percent_24}</TableCell>
        </Fade>
      </SwitchTransition>
      <SwitchTransition>
        <Fade key={percent_7d}>
          <TableCell align="right">{percent_7d}</TableCell>
        </Fade>
      </SwitchTransition>
      <TableCell align="right">{marketCap}</TableCell>

      <TableCell align="right">{volume_24}</TableCell>
      <TableCell align="right">
        {circulating_supply}&nbsp;{row.symbol}
      </TableCell>
    </TableRow>
  );
};

export default BodyRow;
