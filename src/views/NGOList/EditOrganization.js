import React, { useState, useEffect } from 'react';
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
import { organizationById, editOrganizationById } from '../../api/organization.api';

export default function EditOrganization(props) {
    const [orgName, setOrgName] = useState('')
    const [orgDescription, setOrgDescription] = useState('')
    const [orgCountry, setOrgCountry] = useState('')
    const [orgCity, setOrgCity] = useState('')
    const [orgPicture, setOrgPicture] = useState('')

    /* API Methods */
    const editOrganization = async () => {
        try {
            const response = await editOrganizationById(props.org_id, {
                org_name: orgName,
                org_description: orgDescription,
                org_city: orgCity,
                org_country: orgCountry,
                org_picture: orgPicture
            });
            console.log('response edit: ', response.data)
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
            editOrganization();
            props.setOpen(false)
		}
	};

    useEffect(() => { 
        const loadChosenOrganization = async () => {
            const response = await organizationById(props.org_id);
            setOrgName(response.data.data.org_name)
            setOrgDescription(response.data.data.org_description)
            setOrgCountry(response.data.data.org_country)
            setOrgCity(response.data.data.org_city)
            setOrgPicture(response.data.data.org_picture)
            };
            loadChosenOrganization();
    }, [props.org_id]);

    return (
        <Dialog onClose={props.close} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={props.close}>
            Edit Organization Details
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please make the necessary edits to this specific organization.
            </DialogContentText>
            <form noValidate onSubmit={handleSubmit}>
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
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit} color="primary">
                    Save changes
                    </Button>
                </DialogActions>
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
  