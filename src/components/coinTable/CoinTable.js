import { useState } from "react";
import Table from "@mui/material/Table";
import {
  Paper,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
} from "@mui/material";

import CoinTableBody from "./CoinTableBody";
export default function CoinTable() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [dataLength, setDataLength] = useState(0);
  return (
    <Paper>
      <TableContainer>
        <TablePagination
          className="crypto-row-selector"
          component={"div"}
          rowsPerPageOptions={[5, 10, 20]}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value));
            setPage(0);
          }}
          count={dataLength}
          page={page}
          onPageChange={(e, newPage) => {
            setPage(newPage);
          }}
        />
        <Table
          className="coin-table-content"
          sx={{ minWidth: 700, "& td": { fontWeight: 600 } }}
        >
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Crypto Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">24h %</TableCell>
              <TableCell align="right">7d %</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right">Volume(24h)</TableCell>
              <TableCell align="right">Circulating supply</TableCell>
            </TableRow>
          </TableHead>
          <CoinTableBody
            rowsPerPage={rowsPerPage}
            page={page}
            setDataLength={setDataLength}
          />
        </Table>
      </TableContainer>
    </Paper>
  );
}
