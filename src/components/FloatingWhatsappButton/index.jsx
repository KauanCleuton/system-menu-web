import { WhatsApp } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import Link from "next/link";

function FloatingWhatsAppButton() {
  const phoneNumber = "558592985693";
  const message = "Olá! Gostaria de mais informações.";

  return (
    <Tooltip title="Fale conosco:" arrow sx={{ zIndex: 9999 }}>
      <IconButton
        component={Link}
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        sx={{
          position: "fixed",
          bottom: {
            xs: 420,
            sm: 400,
            md: 380,
            lg: 380,
          },
          right: 20,
          bottom:40,
          backgroundColor: "#25D366",
          color: "white",
          "&:hover": {
            backgroundColor: "#1ebe57",
          },
          width: 56,
          height: 56,
          boxShadow: 3,
          zIndex: 9999,
        }}
      >
        <WhatsApp fontSize="large" />
      </IconButton>
    </Tooltip>
  );
}

export default FloatingWhatsAppButton;
