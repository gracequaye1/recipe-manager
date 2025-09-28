import React from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import placeholder from "../assets/placeholder.png"; // default image

function RecipeList({ recipes, onEdit, onDelete }) {
  return (
    <Grid data={recipes} style={{ marginTop: "20px" }}>
      <GridColumn
        field="image"
        title="Image"
        cell={(props) => (
          <td>
            <img
              src={props.dataItem.image || placeholder}
              alt={props.dataItem.name}
              style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
            />
          </td>
        )}
      />
      <GridColumn field="name" title="Recipe Name" />
      <GridColumn field="description" title="Description" />
      <GridColumn field="category" title="Category" />
      <GridColumn
        title="Actions"
        cell={(props) => (
          <td style={{ display: "flex", gap: "5px" }}>
            <Button look="outline" themeColor="info" onClick={() => onEdit(props.dataItem)}>Edit</Button>
            <Button look="outline" themeColor="error" onClick={() => onDelete(props.dataItem.id)}>Delete</Button>
          </td>
        )}
      />
    </Grid>
  );
}

export default RecipeList;
