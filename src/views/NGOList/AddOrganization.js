import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
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
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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

export default function EditOrganization(props) {
  return (
    <Dialog onClose={props.close} aria-labelledby="customized-dialog-title" open={props.open}>
      <DialogTitle id="customized-dialog-title" onClose={props.close}>
        Edit Organization Details
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
            Please add the details of your new organization.
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            id="city"
            label="City"
            type="text"
            fullWidth
              />
        {/* Suggestion: use Autocomplete in material-ui for countries */}
        <TextField
            autoFocus
            margin="dense"
            id="country"
            label="Country"
            type="text"
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            id="picture"
            label="Photo Link"
            type="text"
            fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.close} color="primary">
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}