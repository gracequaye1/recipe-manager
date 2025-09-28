import React, { useState } from "react";
import { Form, Field } from "@progress/kendo-react-form";
import { Input, TextArea } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";

const categories = ["Select a category", "Breakfast", "Lunch", "Dinner"];

const requiredValidator = (value) =>
  value && value !== "Select a category" ? "" : "This field is required.";

const DropDownField = ({ validationMessage, visited, value, onChange }) => (
  <div style={{ marginBottom: "15px" }}>
    <DropDownList
      data={categories}
      defaultItem="Select a category"
      value={value}
      onChange={(e) => onChange(e.value)}
    />
    {visited && validationMessage && (
      <div className="k-required" style={{ color: "red", fontSize: "12px" }}>
        {validationMessage}
      </div>
    )}
  </div>
);

function AddRecipeForm({ onSubmit, onCancel, initialValues }) {
  const [image, setImage] = useState(initialValues?.image || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values) => {
    onSubmit({ ...values, image });
  };

  const values = initialValues || { name: "", description: "", category: "" };

  return (
    <Form
      initialValues={values}
      onSubmit={handleSubmit}
      render={(formRenderProps) => (
        <form onSubmit={formRenderProps.onSubmit} style={{ width: "300px" }}>
          <Field name="name" component={Input} label="Recipe Name" validator={requiredValidator} />
          <Field name="description" component={TextArea} label="Description" validator={requiredValidator} />
          <Field name="category" component={DropDownField} label="Category" validator={requiredValidator} />

          <div style={{ marginBottom: "15px" }}>
            <label>Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && (
              <img
                src={image}
                alt="preview"
                style={{ width: "100px", height: "100px", marginTop: "10px", objectFit: "cover", borderRadius: "5px" }}
              />
            )}
          </div>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <Button type="submit" themeColor="primary">{initialValues ? "Update" : "Save"}</Button>
            <Button look="outline" onClick={onCancel} type="button">Cancel</Button>
          </div>
        </form>
      )}
    />
  );
}

export default AddRecipeForm;
