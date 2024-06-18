import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";

interface AutocompleteProps {
  suggestions: {
    name: string;
    category: string;
    value: string | number;
    id: string;
  }[];
  onAddTag: (tag: { name: string; value: string | number }) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  suggestions,
  onAddTag,
}) => {
  return (
    <Box
      sx={{
        maxHeight: "350px",
        overflowY: "auto",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginTop: "8px",
      }}
    >
      <List>
        {suggestions.map((suggestion) => (
          // Using uuidv4 reason is that some of keys(id, name) coming same
          <ListItem key={uuidv4()} disablePadding>
            <ListItemButton
              onClick={() =>
                onAddTag({
                  name: suggestion.name,
                  value: suggestion.value,
                })
              }
            >
              <ListItemText
                primary={`${suggestion.name} (${suggestion.category})`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Autocomplete;
