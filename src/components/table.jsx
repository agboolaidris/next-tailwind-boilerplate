import React, { useEffect, useState } from "react";
import { Paper, styled, Input } from "@mui/material";
import DateRange from "@mui/icons-material/DateRange";
import * as PropTypes from "prop-types";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
  TableEditRow,
  TableEditColumn,
  TableFilterRow,
  Toolbar,
  SearchPanel,
  TableGroupRow,
  GroupingPanel,
  DragDropProvider,
} from "@devexpress/dx-react-grid-material-ui";
import {
  SortingState,
  IntegratedSorting,
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
  EditingState,
  FilteringState,
  IntegratedFiltering,
  DataTypeProvider,
  SearchState,
  GroupingState,
  IntegratedGrouping,
} from "@devexpress/dx-react-grid";

const PREFIX = "Demo";
const classes = {
  tableStriped: `${PREFIX}-tableStriped`,
  root: `${PREFIX}-root`,
  numericInput: `${PREFIX}-numericInput`,
};

const FilterIcon = ({ type, ...restProps }) => {
  if (type === "month") return <DateRange {...restProps} />;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

const StyledInput = styled(Input)(({ theme }) => ({
  [`&.${classes.root}`]: {
    margin: theme.spacing(1),
  },
  [`& .${classes.numericInput}`]: {
    fontSize: "14px",
    textAlign: "right",
    width: "100%",
  },
}));

const CurrencyEditor = ({ value, onValueChange }) => {
  const handleChange = (event) => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === "") {
      onValueChange();
      return;
    }
    onValueChange(parseInt(targetValue, 10));
  };
  return (
    <StyledInput
      type="number"
      classes={{
        input: classes.numericInput,
        root: classes.root,
      }}
      fullWidth
      value={value === undefined ? "" : value}
      inputProps={{
        min: 0,
        placeholder: "Filter...",
      }}
      onChange={handleChange}
    />
  );
};

CurrencyEditor.propTypes = {
  value: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
};

CurrencyEditor.defaultProps = {
  value: undefined,
};

const getRowId = (row) => row.id;
export default function Index({ columns, data }) {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(data);
  }, [data]);

  const [selection, setSelection] = useState([]);
  const [grouping, setGrouping] = useState([]);
  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map((row) =>
        changed[row.region] ? { ...row, ...changed[row.id] } : row
      );
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter((row) => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

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

  return (
    <Paper>
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <DragDropProvider />
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
        <SearchState />
        <PagingState defaultCurrentPage={0} pageSize={6} />
        <EditingState onCommitChanges={commitChanges} />
        <SortingState
          defaultSorting={[{ columnName: "product", direction: "asc" }]}
        />
        <GroupingState grouping={grouping} onGroupingChange={setGrouping} />
        <FilteringState defaultFilters={[]} />

        <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
        <IntegratedSorting />
        <IntegratedGrouping />
        <IntegratedFiltering />
        <IntegratedSelection />
        <IntegratedPaging />

        <DataTypeProvider
          for={dateColumns}
          availableFilterOperations={dateFilterOperations}
        />
        <DataTypeProvider
          for={currencyColumns}
          availableFilterOperations={currencyFilterOperations}
          editorComponent={CurrencyEditor}
        />

        <Table />
        <TableSelection showSelectAll />
        <TableHeaderRow showSortingControls showGroupingControls />
        <PagingPanel />
        <TableEditRow />
        <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
        <Toolbar />
        <SearchPanel />
        <TableGroupRow />
        <TableFilterRow
          showFilterSelector
          iconComponent={FilterIcon}
          messages={{ month: "Month equals" }}
        />
        <GroupingPanel showGroupingControls />
      </Grid>
    </Paper>
  );
}
