import React from "react";
import { List, Divider, IconButton, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HelpIcon from "@material-ui/icons/Help";
import AddIcon from "@material-ui/icons/Add";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";
import ListIcon from "@material-ui/icons/List";
import { useStyles } from "./UseStyleNavbar";

export const NavBarList = (props) => {
	const classes = useStyles();
	return (
		<div>
			<div className={classes.drawerHeader}>
				<IconButton onClick={props.handleDrawerClose}>
					{props.theme.direction === "ltr" ? (
						<ChevronLeftIcon />
					) : (
						<ChevronRightIcon />
					)}
				</IconButton>
			</div>
			<Divider />
			<div>
				<List class='list'>
					<Link to='/about'>
						<div className='li'>
							<ListItem button key='About'>
								<ListItemIcon>
									<InfoIcon />
								</ListItemIcon>
								<ListItemText class='nav-content' primary='About' />
							</ListItem>
						</div>
					</Link>

					<Link to='/support'>
						<div className='li'>
							<ListItem button key='Support'>
								<ListItemIcon>
									<HelpIcon />
								</ListItemIcon>
								<ListItemText class='nav-content' primary='Support' />
							</ListItem>
						</div>
					</Link>

					<Link to='/AddSuggestion'>
						<div className='li'>
							<ListItem button key='AddSuggestion'>
								<ListItemIcon>
									<AddIcon />
								</ListItemIcon>
								<ListItemText class='nav-content' primary='AddSuggestion' />
							</ListItem>
						</div>
					</Link>

					<Link to='/'>
						<div className='li'>
							<ListItem button key='Logout'>
								<ListItemIcon>
									<VpnKeyIcon />
								</ListItemIcon>
								<ListItemText class='nav-content' primary='Logout' />
							</ListItem>
						</div>
					</Link>
					{props.EventsStore.user && props.EventsStore.user.type === "admin" ? (
						<Link to='/SuggestionsList'>
							<div className='li'>
								<ListItem button key='SuggestionsList'>
									<ListItemIcon>
										<ListIcon />
									</ListItemIcon>
									<ListItemText
										class='nav-content'
										primary='SuggestionsList'
									/>
								</ListItem>
							</div>
						</Link>
					) : null}
				</List>
			</div>
		</div>
	);
};
