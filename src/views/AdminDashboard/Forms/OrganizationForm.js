import React from "react";
import TextField from "@material-ui/core/TextField";

function OrganizationForm(props) {
  const { onSubmit: handleSubmit, activeRecord, setActiveRecord } = props;
  const handleChange = (e, key) => {
    const target = e.target;

    setActiveRecord((prev) => ({
      ...prev,
      data: { ...prev.data, [key]: target.value },
    }));
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Name"
        type="text"
        fullWidth
        value={activeRecord && activeRecord?.data?.org_name}
        onChange={(e) => handleChange(e, "org_name")}
      />
      <TextField
        margin="dense"
        id="description"
        label="Description"
        type="text"
        fullWidth
        value={activeRecord && activeRecord?.data?.org_description}
        onChange={(e) => handleChange(e, "org_description")}
      />
      <TextField
        margin="dense"
        id="city"
        label="City"
        type="text"
        fullWidth
        value={activeRecord && activeRecord?.data?.org_city}
        onChange={(e) => handleChange(e, "org_city")}
      />
      <TextField
        margin="dense"
        id="country"
        label="Country"
        type="text"
        fullWidth
        value={activeRecord && activeRecord?.data?.org_country}
        onChange={(e) => handleChange(e, "org_country")}
      />
      <TextField
        margin="dense"
        id="picture"
        label="Photo Link"
        type="text"
        fullWidth
        value={activeRecord && activeRecord?.data?.org_picture}
        onChange={(e) => handleChange(e, "org_picture")}
      />
    </form>
  );
}

export default OrganizationForm;