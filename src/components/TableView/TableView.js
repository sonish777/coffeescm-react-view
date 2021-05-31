import React, { Component } from "react";
import { Button, Container } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

class TableView extends Component {
  state = {
    page: 0,
    rowsPerPage: 5,
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  render() {
    const { page, rowsPerPage } = this.state;
    const { tableHeaders, tableData, actions, actionHandlers } = this.props;

    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, tableData.length - page * rowsPerPage);
    return (
      <TableContainer component={Container}>
        <Table>
          <TableBody>
            <TableRow>
              {tableHeaders.map((header, i) => (
                <TableCell key={i} component="th">
                  {header}
                </TableCell>
              ))}
            </TableRow>
            {(rowsPerPage > 0
              ? tableData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tableData
            ).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.keys(row).map(
                  (key, i) =>
                    row[key] && (
                      <TableCell key={i} component="th" scope="row">
                        {row[key]}
                      </TableCell>
                    )
                )}
                {actions && (
                  <TableCell>
                    {actionHandlers.map((handler, i) => (
                      <Button
                        color="primary"
                        key={i}
                        onClick={() => handler.handler(rowIndex)}
                      >
                        {handler.text}
                      </Button>
                    ))}
                  </TableCell>
                )}
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
                colSpan={4}
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  }
}

export default TableView;