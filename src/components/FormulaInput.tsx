import React, { useState, useRef, useEffect } from "react";
import { Box, Chip } from "@mui/material";
import useFormulaStore from "../store/formulaStore";
import useAutocomplete from "../hooks/useAutocomplete";
import Autocomplete from "./Autocomplete";

const FormulaInput: React.FC = () => {
  const { tags, setTags } = useFormulaStore();
  const [currentInput, setCurrentInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: suggestions } = useAutocomplete();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentInput.trim()) {
      const operators = /[+\-*/^()]/;
      if (operators.test(currentInput)) {
        setTags([...tags, { name: currentInput, value: currentInput }]);
      } else {
        const suggestion = suggestions?.find(
          (s) => s.name.toLowerCase() === currentInput.toLowerCase()
        );
        if (suggestion) {
          handleAddTag({ name: suggestion.name, value: suggestion.value });
        } else {
          setTags([...tags, { name: currentInput, value: currentInput }]);
        }
      }
      setCurrentInput("");
    }
  };

  const handleAddTag = (tag: { name: string; value: string | number }) => {
    setTags([...tags, tag]);
    setCurrentInput("");
  };

  const handleDeleteTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const filteredSuggestions = currentInput
    ? suggestions?.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(currentInput.toLowerCase())
      ) || []
    : [];

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          border: "1px solid #ccc",
          padding: "8px",
          borderRadius: "4px",
        }}
      >
        {tags.map((tag, index) => (
          <React.Fragment key={index}>
            {/[+\-*/^()]/.test(tag.name) ? (
              <span>{tag.name}</span>
            ) : (
              <Chip
                label={tag.name}
                onDelete={() => handleDeleteTag(index)}
                sx={{ m: 0.5 }}
              />
            )}
          </React.Fragment>
        ))}
        <input
          ref={inputRef}
          value={currentInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type to get tags..."
          style={{ border: "none", outline: "none", flex: 1 }}
        />
      </Box>
      {filteredSuggestions.length > 0 && (
        <Autocomplete
          suggestions={filteredSuggestions}
          onAddTag={handleAddTag}
        />
      )}
    </Box>
  );
};

export default FormulaInput;
