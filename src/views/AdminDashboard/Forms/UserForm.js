import React from "react";
import TextField from "@material-ui/core/TextField";

function UserForm(props) {
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
        id="username"
        label="Username"
        type="text"
        fullWidth
        value={activeRecord?.data?.username}
        onChange={(e) => handleChange(e, "username")}
      />
      <TextField
        margin="dense"
        id="name"
        label="Name"
        type="text"
        fullWidth
        value={activeRecord?.data?.name}
        onChange={(e) => handleChange(e, "name")}
      />
      <TextField
        margin="dense"
        id="email"
        label="Email"
        type="text"
        fullWidth
        value={activeRecord?.data?.email}
        onChange={(e) => handleChange(e, "email")}
      />
      <TextField
        margin="dense"
        id="language"
        label="Language"
        type="text"
        fullWidth
        value={activeRecord?.data?.language}
        onChange={(e) => handleChange(e, "language")}
      />
      <TextField
        margin="dense"
        id="country"
        label="Country"
        type="text"
        fullWidth
        value={activeRecord?.data?.country}
        onChange={(e) => handleChange(e, "country")}
      />
    </form>
  );
}

export default UserForm;