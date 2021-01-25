import React from "react";
import clsx from "clsx";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Logo } from "../../Logo";
import { useStyles } from "./UseStyleNavbar";

export const AppBarComponent = (props) => {
	const classes = useStyles();
	return (
		<AppBar
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(2,1fr)",
				backgroundColor: "rgb(52, 52, 68)",
			}}
			position='fixed'
			className={clsx(classes.appBar, {
				[classes.appBarShift]: props.open,
			})}
		>
			<Toolbar>
				<IconButton
					color='inherit'
					aria-label='open drawer'
					onClick={props.handleDrawerOpen}
					edge='start'
					className={clsx(classes.menuButton, props.open && classes.hide)}
				>
					<MenuIcon />
				</IconButton>
			</Toolbar>
			<div className='logo'>
				<Logo />
			</div>
		</AppBar>
	);
};
