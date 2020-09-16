import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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

import { addOrganization } from '../../api/organization.api';

export default function AddOrganization(props) {
    let history = useHistory();
    const [orgName, setOrgName] = useState('')
    const [orgDescription, setOrgDescription] = useState('')
    const [orgCountry, setOrgCountry] = useState('')
    const [orgCity, setOrgCity] = useState('')
    const [orgPicture, setOrgPicture] = useState('')

    /* API Methods */
    const newOrganization = async () => {
        try {
            const response = await addOrganization({
                org_name: orgName,
                org_description: orgDescription,
                org_city: orgCity,
                org_country: orgCountry,
                org_picture: orgPicture
            });
            console.log('response edit: ', response.data)
            history.push('/list')
        } catch (error) {
            console.log('err login: ', error);
        }
    }

    const handleSubmit = async (event) => {
        console.log('test')
		event.preventDefault();
		const form = event.currentTarget;
		console.log('form: ', form);
		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			newOrganization();
		}
	};

    return (
        <Dialog onClose={props.close} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={props.close}>
            Add Your Organization
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
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
            />
            <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                value={orgDescription}
                onChange={(e) => setOrgDescription(e.target.value)}
            />
            <TextField
                autoFocus
                margin="dense"
                id="city"
                label="City"
                type="text"
                fullWidth
                value={orgCity}
                onChange={(e) => setOrgCity(e.target.value)}
            />
            {/* Suggestion: use Autocomplete in material-ui for countries */}
            <TextField
                autoFocus
                margin="dense"
                id="country"
                label="Country"
                type="text"
                fullWidth
                value={orgCountry}
                onChange={(e) => setOrgCountry(e.target.value)}
            />
            <TextField
                autoFocus
                margin="dense"
                id="picture"
                label="Photo Link"
                type="text"
                fullWidth
                value={orgPicture}
                onChange={(e) => setOrgPicture(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleSubmit} color="primary">
            Save changes
            </Button>
        </DialogActions>
        </Dialog>
    );
}

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
  