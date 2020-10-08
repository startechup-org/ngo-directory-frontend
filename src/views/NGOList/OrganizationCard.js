import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../context/auth';
const OrganizationCard = (props) => {
	const classes = useStyles();
	const { organization, cardActions } = props;
	const { onView: handleView, onEdit: handleEdit } = cardActions;
	const { user } = useAuth();


	return (
		<>
			<Grid item xs={12} sm={6} md={4}>
				<Card className={classes.card}>
					<CardMedia
						className={classes.cardMedia}
						image={'https://source.unsplash.com/random'}
						title='Image title'
					/>
					<CardContent className={classes.cardContent}>
						<Typography gutterBottom variant='h5' component='h2'>
							{organization.org_name}
						</Typography>
						<Typography>{organization.org_description}</Typography>
					</CardContent>
					<CardActions>
						<Button
							size='small'
							color='primary'
							onClick={() => handleView(organization)}
						>
							View
						</Button>
						{organization?.admins?.includes(user._id) && (
									<Button
									size='small'
									color='primary'
									onClick={() => handleEdit(organization)}
								>
									{/* <Button size="small" color="primary" onClick={() => console.log("testing")}> */}
									Edit
								</Button>
						)}
				
					</CardActions>
				</Card>
			</Grid>
		</>
	);
};

const useStyles = makeStyles((theme) => ({
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

export default OrganizationCard;
