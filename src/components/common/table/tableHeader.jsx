import React, { Component } from "react";

// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
  //tiklandiginda siralama render'i icin uste gidiyor.
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path ===  path)
      sortColumn.orderAs = sortColumn.orderAs === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.orderAs = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.orderAs === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
