import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import { organizationById } from '../../api/organization.api';

export default function ViewOrganization(props) {
  const classes = useStyles();
  const [organization, setOrganization] = useState({})
  

  useEffect(() => { 
    const loadChosenOrganization = async () => {
			const response = await organizationById(props.org_id);
			setOrganization(response.data.data);
		};
		loadChosenOrganization();
	}, [props.org_id]);

  return (
    <Dialog onClose={props.close} aria-labelledby="customized-dialog-title" open={props.open} >
      <DialogTitle id="customized-dialog-title" onClose={props.close}>
        Organization Details
      </DialogTitle>
      <DialogContent dividers>
        <List>
          <ListItem>
            <img src="https://source.unsplash.com/random"
            alt="test title" className={classes.img} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Name" secondary={organization.org_name} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Description" secondary={organization.org_description} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="City" secondary={organization.org_city} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Country" secondary={organization.org_country} />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.close} color="primary">
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
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
  img: {
		maxWidth: '100%'
	},
}));

const DialogTitle = (props) => {
  const classes = useStyles()
  const { children, onClose, ...other } = props;
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
};

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