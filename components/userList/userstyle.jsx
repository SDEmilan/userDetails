export const userstyle = {
    mainpaper: {
        width: "100%",
        height: "auto",
    },
    list: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        color: "white",

        backgroundColor: "#532950"
    },
    name: {
        color: "black",
        fontSize: 15,
        fontWeight: 700,
        textAlign: "center",
        width: 200,

        height: 20,
        textAlign: "left"
    },
    userPaper: {
        width: { xs: "90%", md: "30%", sm: "95%", lg: "35%" },
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        m: 1,
        p: 1,
        "&:hover": {
            cursor: "grab",
        }
    },
    mainbox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        flexDirection: "column",

        height: 198,
        width: { sm: "100%" },
        "&:hover": {
            cursor: "grab",
            backgroundColor: "#31363F",
            color: "white"
        },
    },
    userno: {
        color: "black",
        fontSize: 15,
        fontWeight: 700,
    },
    namebox: {
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "left", md: "left" },
        gap: 2,
        width: 300,
        height: 30,
        ml: { xs: 3 }
    },
    text: {
        fontSize: { xs: 14, sm: 16, md: 17, lg: 18 },
        fontWeight: 700,
        width: 90
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: "column",
        gap: 2
    },
    loadingtext: {
        ml: { xs: 2, sm: 1, md: 2 },
    },
    paperprops:{
  
            mt: 35,
            width: { xs: "90%", sm: "90%", md: "30%" },
            height: '200px',
            "&:hover": {
                cursor: "grab",
                backgroundColor: "#31363F",
                color: "white"
            },
            ml: { sm: -4 }
        
    }
}