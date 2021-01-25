import React from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import { Drawer, CssBaseline } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import "../Styles/Navbar.css";
import { useStyles } from "./NavbarComponents/UseStyleNavbar";
import { AppBarComponent } from "./NavbarComponents/AppBar";
import { NavBarList } from "./NavbarComponents/NavBarList";

const NavBar = inject("EventsStore")(
	observer((props) => {
		console.log(props.EventsStore.user);
		const classes = useStyles();
		const theme = useTheme();
		const [open, setOpen] = React.useState(false);

		const handleDrawerOpen = () => {
			setOpen(true);
		};

		const handleDrawerClose = () => {
			setOpen(false);
		};

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBarComponent open={open} handleDrawerOpen={handleDrawerOpen} />
				<Drawer
					className={classes.drawer}
					variant='persistent'
					anchor='left'
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<NavBarList
						theme={theme}
						handleDrawerClose={handleDrawerClose}
						EventsStore={props.EventsStore}
					/>
				</Drawer>
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open,
					})}
				>
					<div className={classes.drawerHeader} />
				</main>
			</div>
		);
	})
);

export default NavBar;
