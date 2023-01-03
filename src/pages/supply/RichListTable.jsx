import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  Grid,
  Box,
  IconButton,
  Menu,
  Typography,
  useTheme,
  MenuItem,
} from "@mui/material";
import TablePaginationActions from "../../components/TablePaginationActions";
import { tokens } from "../../theme";
import { useState } from "react";
import {
  SettingsOutlined as SettingsOutlinedIcon,
  LaunchOutlined as LaunchOutlinedIcon,
  CheckOutlined as CheckOutlinedIcon,
} from "@mui/icons-material";

const RichListTable = ({ rows, title, subtitle, url }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [chartWidth, setChartWidth] = useState(11.6);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid
      item
      xs={chartWidth}
      sx={{
        border: `1px solid ${colors.backgroundColor[400]}`,
        borderRadius: "10px",
        backgroundColor: colors.backgroundColor[400],
        boxShadow: `1px 2px ${colors.backgroundColor[900]}`,
        justifyContent: "start",
        display: "flex",
        padding: "20px",
        flexDirection: "column",
        marginTop: "10px",
      }}
    >
      <Box
        sx={{
          justifyContent: "space-between",
          justifyItems: "baseline",
          display: "flex",
          width: "100%",
        }}
      >
        <Box>
          <Typography color={colors.primary[600]} fontSize="1.4rem">
            {title}
          </Typography>
          <Typography color={colors.grey[200]} fontSize="1rem">
            {subtitle}
          </Typography>
        </Box>
        <Box>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <SettingsOutlinedIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose} divider={true}>
              <a
                href={url}
                target="_blank"
                style={{ textDecoration: "none", color: colors.grey[100] }}
              >
                Source Query
                <LaunchOutlinedIcon sx={{ marginLeft: "10px" }} />
              </a>
            </MenuItem>
            <MenuItem disabled>Chart Width</MenuItem>
            <MenuItem
              sx={{
                justifyContent: "space-between",
                justifyItems: "baseline",
                display: "flex",
              }}
              onClick={() => {
                setChartWidth(5.8);
                handleClose();
              }}
            >
              50%
              {chartWidth === 5.8 && <CheckOutlinedIcon />}
            </MenuItem>
            <MenuItem
              sx={{
                justifyContent: "space-between",
                justifyItems: "baseline",
                display: "flex",
              }}
              onClick={() => {
                setChartWidth(11.6);
                handleClose();
              }}
            >
              100%
              {chartWidth === 11.6 && <CheckOutlinedIcon />}
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: "20px",
        }}
      >
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow
              key="header"
              sx={{
                background: colors.primary[400],
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "70%", fontWeight: "regular", fontSize: "1.1rem" }}
                align="left"
              >
                User
              </TableCell>
              <TableCell
                sx={{ width: "30%", fontWeight: "regular", fontSize: "1.1rem" }}
                align="left"
              >
                Balance (LUNA)
              </TableCell>
            </TableRow>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow
                key={row.USER}
                sx={{
                  background:
                    index % 2 === 0 ? colors.grey[900] : "transparent",
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: "70%" }}
                  align="left"
                >
                  {row.USER}
                </TableCell>
                <TableCell style={{ width: "30%" }} align="left">
                  {row.BALANCE ? row.BALANCE.toLocaleString("en-US") : null}
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default RichListTable;
