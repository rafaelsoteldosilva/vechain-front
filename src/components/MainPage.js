import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import NavBar from "./NavBar";
import Footer from "./Footer";
import PersistentLeftDrawer from "./PersistentLeftDrawer";

const drawerWidth = 220;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
   ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `${drawerWidth}`,
      ...(open && {
         transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
         }),
         marginLeft: 0,
      }),
   })
);

const MainPage = ({ render }) => {
   const [drawerOpen, setDrawerOpen] = React.useState(false);
   const [marginLeftWhenDrawerOpens, setMarginLeftWhenDrawerOpens] =
      useState(0);

   const handleDrawerOpen = () => {
      setDrawerOpen(true);
      setMarginLeftWhenDrawerOpens(drawerWidth);
   };

   const handleDrawerClose = () => {
      setDrawerOpen(false);
      setMarginLeftWhenDrawerOpens(0);
   };

   return (
      <React.Fragment>
         <PersistentLeftDrawer
            drawerOpen={drawerOpen}
            closeDrawer={handleDrawerClose}
            drawerWidth={drawerWidth}
         />
         <Main
            open={drawerOpen}
            sx={{ marginLeft: `${marginLeftWhenDrawerOpens}px` }}
         >
            <Grid container direction="column">
               <Grid item>
                  <NavBar
                     openDrawer={handleDrawerOpen}
                     marginLeftWhenDrawerOpens={marginLeftWhenDrawerOpens}
                  />
               </Grid>
               <Box sx={{ flexGrow: 1, marginBottom: "80px" }} />
               <Grid item container>
                  {render()}
               </Grid>
               <Grid item>
                  <Footer />
               </Grid>
            </Grid>
         </Main>
      </React.Fragment>
   );
};

export default MainPage;
