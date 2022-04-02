import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from "@devexpress/dx-react-core";

import * as PropTypes from "prop-types";
import { TableFilterRow } from "@devexpress/dx-react-grid-material-ui";

import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MuiGrid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import { styled, MenuItem } from "@mui/material";
import DateRange from "@mui/icons-material/DateRange";
// eslint-disable-next-line
import moment from "moment";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterMoment from "@mui/lab/AdapterMoment";

/* eslint-disable no-shadow */
export const Popup = ({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  open,
}) => {
  const [states, setState] = useState([]);

  useEffect(() => {
    //@API CALL for location select data
    axios.get("/states").then((res) => {
      setState(res.data);
    });
  }, []);
  return (
    <Dialog
      open={open}
      onClose={onCancelChanges}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Employee Details</DialogTitle>
      <DialogContent>
        <MuiGrid container spacing={3}>
          <MuiGrid item xs={6}>
            <FormGroup>
              <TextField
                margin="normal"
                name="FirstName"
                label="First Name"
                value={row.FirstName || ""}
                onChange={onChange}
              />
              <TextField
                margin="normal"
                name="Prefix"
                label="Title"
                value={row.Prefix || ""}
                onChange={onChange}
              />
              <TextField
                margin="normal"
                name="Position"
                label="Position"
                value={row.Position || ""}
                onChange={onChange}
              />
              <TextField
                margin="normal"
                name="Address"
                label="Address"
                value={row.Address || ""}
                onChange={onChange}
              />
            </FormGroup>
          </MuiGrid>
          <MuiGrid item xs={6}>
            <FormGroup>
              <TextField
                margin="normal"
                name="LastName"
                label="Last Name"
                value={row.LastName || ""}
                onChange={onChange}
              />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  renderInput={(props) => (
                    <TextField margin="normal" {...props} />
                  )}
                  label="Birth Date"
                  value={row.BirthDate}
                  name="birthDate"
                  onChange={(value) => {
                    onChange({
                      target: { name: "BirthDate", value: value.toDate() },
                    });
                  }}
                  inputFormat="DD/MM/YYYY"
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  renderInput={(props) => (
                    <TextField margin="normal" {...props} />
                  )}
                  label="Hire Date"
                  value={row.HireDate}
                  onChange={(value) =>
                    onChange({
                      target: { name: "HireDate", value: value.toDate() },
                    })
                  }
                  inputFormat="DD/MM/YYYY"
                />
              </LocalizationProvider>
              {states.length > 0 && (
                <TextField
                  margin="normal"
                  label="State"
                  select
                  name="StateID"
                  value={row.StateID || ""}
                  onChange={onChange}
                >
                  {states.map(({ id, Name }) => (
                    <MenuItem key={id} value={id}>
                      {Name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </FormGroup>
          </MuiGrid>
          <MuiGrid item xs={12}>
            <FormGroup>
              <TextField
                margin="normal"
                name="Notes"
                label="Notes"
                multiline
                maxRows={4}
                value={row.Notes}
                onChange={onChange}
              />
            </FormGroup>
          </MuiGrid>
        </MuiGrid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelChanges} color="secondary">
          Cancel
        </Button>
        <Button onClick={onApplyChanges} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const PopupEditing = React.memo(({ popupComponent: Popup }) => (
  <Plugin>
    <Template name="popupEditing">
      <TemplateConnector>
        {(
          {
            rows,
            getRowId,
            addedRows,
            editingRowIds,
            createRowChange,
            rowChanges,
          },
          {
            changeRow,
            changeAddedRow,
            commitChangedRows,
            commitAddedRows,
            stopEditRows,
            cancelAddedRows,
            cancelChangedRows,
          }
        ) => {
          const isNew = addedRows.length > 0;
          let editedRow;
          let rowId;
          if (isNew) {
            rowId = 0;
            editedRow = addedRows[rowId];
          } else {
            [rowId] = editingRowIds;
            const targetRow = rows.filter((row) => getRowId(row) === rowId)[0];
            editedRow = { ...targetRow, ...rowChanges[rowId] };
          }

          const processValueChange = ({ target: { name, value } }) => {
            const changeArgs = {
              rowId,
              change: createRowChange(editedRow, value, name),
            };
            if (isNew) {
              changeAddedRow(changeArgs);
            } else {
              changeRow(changeArgs);
            }
          };
          const rowIds = isNew ? [0] : editingRowIds;
          const applyChanges = () => {
            if (isNew) {
              commitAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              commitChangedRows({ rowIds });
            }
          };
          const cancelChanges = () => {
            if (isNew) {
              cancelAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              cancelChangedRows({ rowIds });
            }
          };

          const open = editingRowIds.length > 0 || isNew;
          return (
            <Popup
              open={open}
              row={editedRow}
              onChange={processValueChange}
              onApplyChanges={applyChanges}
              onCancelChanges={cancelChanges}
            />
          );
        }}
      </TemplateConnector>
    </Template>
    <Template name="root">
      <TemplatePlaceholder />
      <TemplatePlaceholder name="popupEditing" />
    </Template>
  </Plugin>
));
export const FilterIcon = ({ type, ...restProps }) => {
  if (type === "month") return <DateRange {...restProps} />;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

const PREFIX = "Demo";
const classes = {
  root: `${PREFIX}-root`,
  numericInput: `${PREFIX}-numericInput`,
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

export const CurrencyEditor = ({ value, onValueChange }) => {
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
