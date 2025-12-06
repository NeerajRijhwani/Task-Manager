import { useState } from "react";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

export function TextInput({
  required = false,
  label,
  name,
  type,
  id,
  variant,
  placeholder,
  onChange,
  helperText = "",
  error = false,
  fullwidth = true,
  PrivacyToggle = false,
  handleClickShowPrivacy = null,
  PrivacyComponent = null,
  ...props
}) {
  return (
    <TextField
      error={error}
      required={required}
      id={id}
      label={label}
      name={name}
      type={type}
      variant={variant}
      fullWidth={fullwidth}
      placeholder={placeholder}
      helperText={helperText}
      onChange={onChange}
      InputProps={
        PrivacyToggle
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle Privacy"
                    onClick={handleClickShowPrivacy}
                    edge="end"
                  >
                    <PrivacyComponent />
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
}
