import { WhatsApp } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import Link from "next/link";

function FloatingWhatsAppButton() {
  const phoneNumber = "558592985693";
  const message = "Olá! Gostaria de mais informações.";

  return (
    <Tooltip title="Fale conosco:" arrow sx={{
      zIndex: 1
    }}>
      <IconButton
        component={Link}
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        sx={{
          position: "fixed",
          bottom: 300,
          right: 20,
          backgroundColor: "#25D366",
          color: "white",
          "&:hover": {
            backgroundColor: "#1ebe57",
          },
          width: 56,
          height: 56,
          boxShadow: 3,
        }}
      >
        <WhatsApp fontSize="large" />
      </IconButton>
    </Tooltip>
  );
}

export default FloatingWhatsAppButton;
