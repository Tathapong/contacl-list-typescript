import { useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { selectUser } from "../stores/userSlice";

import { Container, Typography, Box } from "@mui/material";
import SearchInput from "./SearchInput";
import ContactSection from "./ContactSection";

function Dashboard() {
  const user = useAppSelector(selectUser);

  const [search, setSearch] = useState<string>("");

  return (
    <Container sx={{ overflow: "hidden", flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", bgcolor: "AppWorkspace" }}>
      <Box display={"flex"} flexDirection={"column"} gap={1} alignItems={"center"} p={3}>
        <Typography textAlign={"center"} variant="h6">
          {"Welcome "}
        </Typography>
        <Typography textAlign={"center"} variant="h4" fontWeight={"bold"} color={"Highlight"}>
          {user ? `${user.firstName} ${user.lastName}` : ""}
        </Typography>
      </Box>
      <SearchInput setSearch={setSearch} />
      <ContactSection search={search} />
    </Container>
  );
}

export default Dashboard;
