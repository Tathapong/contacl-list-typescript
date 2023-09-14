import { Box, Avatar, Typography, Paper } from "@mui/material";
import { ContactType } from "../interface/interfaces";

interface ContactProps {
  contact: ContactType;
}

function Contact({ contact }: ContactProps) {
  return (
    <Paper elevation={5} sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
      <Avatar sx={{ width: 72, height: 72 }} />
      <Box textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={"hidden"}>
        <Typography variant="body2">{`Name : ${contact.firstName} ${contact.lastName}`}</Typography>
        <Typography variant="body2">{`Email : ${contact.email}`}</Typography>
        <Typography variant="body2">{`Company : ${contact.company}`}</Typography>
        <Typography variant="body2">{`Phone : ${contact.phone}`}</Typography>
      </Box>
    </Paper>
  );
}

export default Contact;
