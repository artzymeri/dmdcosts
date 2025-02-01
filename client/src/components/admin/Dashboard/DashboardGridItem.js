import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";

const DashboardGridItem = ({ title, data }) => {
  return (
    <Card variant="outlined" sx={{ padding: "10px" }}>
      <h3 style={{ padding: "5px" }}>{title}</h3>
      <TableContainer
        sx={{ borderTop: "1px solid lightgray" }}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Reference</TableCell>
              <TableCell align="right">Claimant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data.map((case_item) => (
                <TableRow
                  key={case_item?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {case_item.reference_number}
                  </TableCell>
                  <TableCell align="right">{case_item.claimant_name}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default observer(DashboardGridItem);
