import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";

function Modal(props) {
  const {
    activeOrganization,
    setActiveOrganization,
    handleSubmit,
    action,
    open,
    setOpen,
  } = props;

  const handleChange = (e, key) => {
    const target = e.target;

    setActiveOrganization((prev) => ({
      ...prev,
      [key]: target.value,
    }));
  };

  return (
    <Dialog
      onClose={() => setOpen(false)}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={props.close}>
        {`${action} Organization Details`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please make the necessary edits to this specific organization.
        </DialogContentText>
        {action === "View" && (
          <img
            src="https://source.unsplash.com/random"
            alt="test title"
            style={{ maxWidth: "100%" }}
          />
        )}
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={activeOrganization && activeOrganization.org_name}
            onChange={(e) => handleChange(e, "org_name")}
            InputProps={{
              disabled: action === "View",
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={activeOrganization && activeOrganization.org_description}
            onChange={(e) => handleChange(e, "org_description")}
            InputProps={{
              disabled: action === "View",
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="city"
            label="City"
            type="text"
            fullWidth
            value={activeOrganization && activeOrganization.org_city}
            onChange={(e) => handleChange(e, "org_city")}
            InputProps={{
              disabled: action === "View",
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="country"
            label="Country"
            type="text"
            fullWidth
            value={activeOrganization && activeOrganization.org_country}
            onChange={(e) => handleChange(e, "org_country")}
            InputProps={{
              disabled: action === "View",
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="picture"
            label="Photo Link"
            type="text"
            fullWidth
            value={activeOrganization && activeOrganization.org_picture}
            onChange={(e) => handleChange(e, "org_picture")}
            InputProps={{
              disabled: action === "View",
            }}
          />
          {["Add", "Edit"].includes(action) && (
            <DialogActions>
              <Button autoFocus onClick={handleSubmit} color="primary">
                {action === "Add" ? "Add" : "Save changes"}
              </Button>
            </DialogActions>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default Modal;