import React from 'react';
import OrganizationCard from './OrganizationCard';
import Grid from '@material-ui/core/Grid';

const OrganizationGrid = (props) => {
	const { organizations, ...rest } = props;

	return (
		<Grid container spacing={4}>
			{organizations.map((organization) => (
				<OrganizationCard
					key={organization._id}
					organization={organization}
					{...rest}
				/>
			))}
		</Grid>
	);
};

export default OrganizationGrid;
