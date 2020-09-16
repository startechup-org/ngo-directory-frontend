import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Container from '@material-ui/core/Container';
import OrganizationGrid from './OrganizationGrid';

import { managedOrganizationsByUser } from '../../api/user.api';
import { allOrganizations } from '../../api/organization.api';
import AddOrganization from "./AddOrganization"

export default function Album() {
	const classes = useStyles();

	/* States */
	const [organizations, setOrganizations] = useState([]);
	const [managedOrganizations, setManagedOrganizations] = useState([]);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	}

	// Load organizations
	useEffect(() => { //side effects in react
		const loadOrganizations = async () => {
			const response = await allOrganizations();  //how to async with useEffect
			console.log('response: ', response.data.data); //so create a function with 
			setOrganizations(response.data.data);
		};

		const user_id = localStorage.getItem('user_id');
		const loadManagedOrgs = async () => {
			const response = await managedOrganizationsByUser(user_id);
			console.log('response: ', response.data.data);
			setManagedOrganizations(response.data.data);
		};

		loadOrganizations();
		loadManagedOrgs();
	}, []);

	// useEffect(() => {}, []);

	//if you don't like to make another component
	// renderOrganizationsGrid(){

	// }

	// renderOrganizationsCard(){

	// }

	return (
		<React.Fragment>
			<CssBaseline />
			<main>
				{/* Heading */}
				<div className={classes.heroContent}>
					<Container maxWidth='sm'>
						<Typography variant='h3' align='center' color='textPrimary'>
							NGO Directory
						</Typography>
					</Container>
				</div>
				<IconButton aria-label="add" onClick={() => handleClickOpen("view")} >
					<AddCircleOutlinedIcon />
				</IconButton>
				{/* Managed Organizations */}
				{managedOrganizations.length > 0 && (
					<Container className={classes.cardGrid} maxWidth='md'>
						<Typography
							variant='h5'
							align='left'
							color='textPrimary'
							gutterBottom
						>
							Organizations you manage
						</Typography>
						<br></br>
						{/* renderOrganizationsGrid(managedOrganizations) */}
						<OrganizationGrid organizations={managedOrganizations} />
					</Container>
				)}
				{/* End Managed Organizations */}
				{/* Other Organizations */}
				<Container className={classes.cardGrid} maxWidth='md'>
					<Typography
						variant='h5'
						align='left'
						color='textPrimary'
						gutterBottom
					>
						Other Organizations
					</Typography>
					<br></br>
					<OrganizationGrid organizations={organizations} />
				</Container>
				{/* End Other Organizations*/}
			</main>
			<AddOrganization open={open} close={handleClose} aria-labelledby="form-dialog-title" />
		</React.Fragment>
	);
}

const useStyles = makeStyles((theme) => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
}));
