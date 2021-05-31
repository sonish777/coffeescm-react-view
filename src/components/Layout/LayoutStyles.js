const drawerWidth = 240;

const styles = (theme) => {
  return {
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#1b2123",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      backgroundColor: "#efefef",
      minHeight: "calc(100vh - 48px)",
    },
    navLinks: {
      color: "#f4f4f8",
      textDecoration: "none",
      display: "block",
    },
    activeNavLink: {
      borderLeftColor: "#f4f4f8",
      borderLeft: "solid",
    },
  };
};

export default styles;
