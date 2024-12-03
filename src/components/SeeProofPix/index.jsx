import React from 'react';
import { Modal, Box, Typography, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Image from 'next/image';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 300, sm: 400 },
    bgcolor: 'secondary.main',
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
};

const SeeProofPix = ({ data, open, close, index }) => {
    const handleClose = () => {
        if (close) {
            close();
        }
    };

    // Verifica se o dado e o índice são válidos
    const comprovanteSrc =
        data && data[index] && data[index].comprovante
            ? `${process.env.NEXT_PUBLIC_BASE_URL}${data[index].comprovante}`
            : null;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container justifyContent="center" alignItems="center" gap={4}>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                display: 'flex',
                            }}
                        >
                            <Typography id="modal-modal-title" variant="h6">
                                Comprovante Pix
                            </Typography>
                            <IconButton onClick={handleClose} color="primary">
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {comprovanteSrc ? (
                                <Zoom>
                                    <Box
                                        sx={{
                                            width: 250,
                                            height: 250,
                                            position: 'relative',
                                        }}
                                    >
                                        <Image
                                            src={comprovanteSrc}
                                            alt="Imagem do comprovante pix"
                                            layout="fill"
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </Box>
                                </Zoom>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    Nenhuma imagem disponível
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default SeeProofPix;
