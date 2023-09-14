import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Status } from "../interface/interfaces";
import { selectUser } from "../stores/userSlice";
import { selectStatus, selectError, selectContactsBySearch, thunk_fetchContacts } from "../stores/contactsSlice";

import { CircularProgress, Box, Typography } from "@mui/material";
import Contact from "./Contact";

interface ContactSectionProps {
  search: string;
}

function ContactSection({ search }: ContactSectionProps) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const contacts = useAppSelector((state) => selectContactsBySearch(state, search));
  const contactsStatus = useAppSelector(selectStatus);
  const contactsError = useAppSelector(selectError);

  const isLoading = contactsStatus === Status.PENDING;

  useEffect(() => {
    const fetch = async () => {
      if (contactsStatus === Status.IDLE && user) {
        await dispatch(thunk_fetchContacts(user.id));
      }
    };

    fetch();
  }, [user, dispatch]);

  return (
    <Box width={"90%"} maxWidth={"600px"} display={"flex"} flexDirection={"column"} gap={2} flexGrow={1} overflow={"auto"} pr={3} mt={3}>
      {isLoading ? (
        <CircularProgress sx={{ alignSelf: "center" }} />
      ) : (
        <>
          <Typography variant="body2">{`Result found : ${contacts.length}`}</Typography>
          {contacts.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))}
        </>
      )}
      <Typography variant="body2" color="red" textAlign={"center"}>
        {contactsError}
      </Typography>
    </Box>
  );
}

export default ContactSection;
