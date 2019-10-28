import React from "react";

const ListGroup = ({
  items, //data
  textProperty, //items icinden text hangi property ile cekilir
  keyProperty, //items icinden id'si hangi property ile cekilir.
  selectedItem,//secili olan item'i active etmek icin
  onItemSelect 
}) => {

  const checkSelected = (item) => {
      let className = " ";   
      if(selectedItem == null && item["_id"] == "head") {className += "active"}
      if(selectedItem == item) { className += "active"}
      return className;
  };

  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[keyProperty]}
          className={
            "list-group-item" + checkSelected(item)           
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

//IMPORTANT: Props'dan degisken gelmese bile default degerlerin atanabilmesi mumkun.
ListGroup.defaultProps = {
  textProperty: "name",
  keyProperty: "_id"
};

export default ListGroup;
