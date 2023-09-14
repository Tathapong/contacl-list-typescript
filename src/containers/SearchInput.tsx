import React, { useRef } from "react";

import { InputBase, Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchInputProps {
  setSearch: (search: string) => void;
}

function SearchInput({ setSearch }: SearchInputProps) {
  const inputEl = useRef<HTMLInputElement>(null);

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (inputEl.current) setSearch(inputEl.current.value);
  }

  return (
    <Paper
      component="form"
      onSubmit={onSubmit}
      variant="elevation"
      elevation={4}
      sx={{ mt: 2, p: "2px 4px", display: "flex", alignItems: "center", maxWidth: 400, width: "90%" }}
    >
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search by word" inputRef={inputEl} />
      <IconButton type="submit" sx={{ p: "10px" }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchInput;
