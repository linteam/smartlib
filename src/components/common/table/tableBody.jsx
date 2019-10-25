import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    //eger like ya da delete gibi bir buton ya da content varsa direkt onun donmesini sagliyoruz.
    if (column.content) return column.content(item);
    //content yoksa item objesinin icindeki veriyi path'e gore aliyoruz lodash kutuphanesi ile.
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    //pathsiz kolonlar olabilir like ve delete gibi bu sebeple name or key dendi
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
