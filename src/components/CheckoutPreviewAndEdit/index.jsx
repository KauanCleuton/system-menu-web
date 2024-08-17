import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';

// Simulação do documento PDF
const PDFDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={{ padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Resumo do Pedido</Text>
        <Text>{`Endereço: ${data.address.road}, ${data.address.house_number}, ${data.address.neighborhood}, ${data.address.city}, ${data.address.complement}`}</Text>
        <Text>{`Data: ${new Date().toLocaleDateString()}`}</Text>
      </View>
      <View>
        {data.orderItems.map((item, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text>{`Produto: ${item.title}`}</Text>
            <Text>{`Quantidade: ${item.quantity}`}</Text>
            <Text>{`Preço: ${item.price}`}</Text>
          </View>
        ))}
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{`Total: ${data.total_price}`}</Text>
      </View>
    </Page>
  </Document>
);

const CheckoutPreviewAndEdit = ({ data, handleFinalize }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Visualizar Dados
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {/* <Typography variant="h5" color="secondary">Resumo do Pedido</Typography> */}
          {/* <Typography variant="body1" color="textPrimary"><strong>Título:</strong> {data.title || 'Não disponível'}</Typography> */}
          <Typography variant="body1" sx={{color: "#000"}}>
            <strong>Endereço:</strong> {data.address ? `${data.address.road}, ${data.address.house_number}, ${data.address.neighborhood}, ${data.address.city}, ${data.address.complement}` : 'Não disponível'}
          </Typography>
          <Typography variant="body1" sx={{color: "#000"}}><strong>Data:</strong> {new Date().toLocaleDateString()}</Typography>
          {data.orderItems.map((item, index) => (
            <Box key={index} sx={{ mb: 2, mt: 2 }}>
              <Typography variant="body1" sx={{color: "#000"}}><strong>Produto:</strong> {item.title}</Typography>
              <Typography variant="body1" sx={{color: "#000"}}><strong>Quantidade:</strong> {item.quantity}</Typography>
              <Typography variant="body1" sx={{color: "#000"}}><strong>Observação:</strong> {item.observation}</Typography>
              <Typography variant="body1" sx={{color: "#000"}}><strong>Preço:</strong> {parseInt(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
            </Box>
          ))}
          <Typography variant="h6" color="secondary"><strong>Total:</strong> {parseInt(data.total_price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => handleFinalize(data)}
          >
            Finalizar Compra
          </Button>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <Box sx={{ border: '1px solid #ddd', borderRadius: 1, overflow: 'hidden', height: '80vh' }}>
            <PDFDownloadLink
              document={<PDFDocument data={data} />}
              fileName="pedido.pdf"
            >
              {({ loading }) => (loading ? 'Carregando documento...' : 'Download PDF')}
            </PDFDownloadLink>
          </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default CheckoutPreviewAndEdit;
