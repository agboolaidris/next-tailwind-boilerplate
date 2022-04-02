import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  SortingState,
  IntegratedSorting,
  EditingState,
  FilteringState,
  IntegratedFiltering,
  DataTypeProvider,
  SearchState,
  GroupingState,
  IntegratedGrouping,
  PagingState,
  IntegratedPaging,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  TableHeaderRow,
  TableEditColumn,
  TableFilterRow,
  Table,
  TableColumnVisibility,
  Toolbar,
  ColumnChooser,
  SearchPanel,
  TableGroupRow,
  GroupingPanel,
  DragDropProvider,
  PagingPanel,
  TableFixedColumns,
} from "@devexpress/dx-react-grid-material-ui";
import { CurrencyEditor, FilterIcon, Popup, PopupEditing } from "./shared";
import axios from "axios";

const getRowId = (row) => row.id;
export default function I({ columns, loading, data }) {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(data);
  }, [data]);

  const [dateColumns] = useState(["saleDate"]);
  const [dateFilterOperations] = useState([
    "month",
    "contains",
    "startsWith",
    "endsWith",
  ]);

  const [currencyColumns] = useState(["amount"]);
  const [currencyFilterOperations] = useState([
    "equal",
    "notEqual",
    "greaterThan",
    "greaterThanOrEqual",
    "lessThan",
    "lessThanOrEqual",
  ]);

  const [filteringColumnExtensions] = useState([
    {
      columnName: "saleDate",
      predicate: (value, filter, row) => {
        if (!filter.value.length) return true;
        if (filter && filter.operation === "month") {
          const month = parseInt(value.split("-")[1], 10);
          return month === parseInt(filter.value, 10);
        }
        return IntegratedFiltering.defaultPredicate(value, filter, row);
      },
    },
  ]);

  const [tableColumnExtensions] = useState([
    { columnName: "FirstName", width: 300 },
    { columnName: "LastName", width: 300 },
  ]);
  const [leftColumns] = useState(["FirstName", "LastName"]);
  const [rightColumns] = useState([""]);
  const commitChanges = async ({ added, changed, deleted }) => {
    try {
      let changedRows;

      //handle added new row
      if (added) {
        const data = {
          ...added[0],
        };
        const res = await axios.post("users", data, {
          headers: { "content-type": "application/json" },
        });

        changedRows = [...rows, res.data];
      }

      //handle edit row
      if (changed) {
        const data = changed[Object.keys(changed)[0]];
        const id = Object.keys(changed)[0];
        const res = await axios.patch("users/" + id, data, {
          headers: { "content-type": "application/json" },
        });
        changedRows = rows.map((row) =>
          row.id === res.data.id ? res.data : row
        );
      }

      //handle deleted row
      if (deleted) {
        const id = deleted[0];
        await axios.delete("users/" + id, data, {
          headers: { "content-type": "application/json" },
        });
        const deletedSet = new Set(deleted);
        changedRows = rows.filter((row) => !deletedSet.has(row.id));
      }
      setRows(changedRows);
    } catch (error) {
      alert("axios err");
    }
  };

  return (
    <Paper>
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <EditingState onCommitChanges={commitChanges} />
        <SearchState />
        <SortingState />
        <DragDropProvider />
        <GroupingState />
        <PagingState defaultCurrentPage={0} pageSize={50} />

        <DataTypeProvider
          for={dateColumns}
          availableFilterOperations={dateFilterOperations}
        />
        <DataTypeProvider
          for={currencyColumns}
          availableFilterOperations={currencyFilterOperations}
          editorComponent={CurrencyEditor}
        />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
        <IntegratedGrouping />
        <IntegratedPaging />
        <IntegratedSorting />
        <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
        <Table columnExtensions={tableColumnExtensions} />
        <TableColumnVisibility />
        <TableHeaderRow showSortingControls />
        <TableFilterRow
          showFilterSelector
          iconComponent={FilterIcon}
          messages={{ month: "Month equals" }}
        />
        <TableGroupRow />
        <Toolbar />
        <GroupingPanel />
        <ColumnChooser />
        <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
        <TableFixedColumns
          leftColumns={leftColumns}
          rightColumns={rightColumns}
        />

        <SearchPanel />

        <PagingPanel />
        <PopupEditing popupComponent={Popup} />
      </Grid>
    </Paper>
  );
}
