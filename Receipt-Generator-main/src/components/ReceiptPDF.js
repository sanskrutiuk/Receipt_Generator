import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    objectFit: 'contain'
  },
  receiptDetails: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    color: '#555555',
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    marginBottom: 10,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  signature: {
    width: 150,
    height: 'auto',
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#666666',
    fontSize: 10,
  },
});

const ReceiptPDF = ({ formData, signaturePreview }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.receiptDetails}>
          <Text style={styles.title}>Receipt #{formData.receiptId}</Text>
          <Text style={styles.value}>Date: {formData.date}</Text>
        </View>
        <Image
          src="/company-logo.png"
          style={styles.logo}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>From:</Text>
        <Text style={styles.value}>{formData.fromName}</Text>
        <Text style={styles.value}>{formData.fromEmail}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Bill To:</Text>
        <Text style={styles.value}>{formData.billToName}</Text>
        <Text style={styles.value}>{formData.billToEmail}</Text>
        {formData.billToAddress && (
          <Text style={styles.value}>{formData.billToAddress}</Text>
        )}
        {formData.billToPhone && (
          <Text style={styles.value}>Phone: {formData.billToPhone}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{formData.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.amount}>₹ {formData.amount}</Text>
      </View>

      {formData.notes && (
        <View style={styles.section}>
          <Text style={styles.label}>Notes:</Text>
          <Text style={styles.value}>{formData.notes}</Text>
        </View>
      )}

      {signaturePreview && (
        <View style={styles.section}>
          <Text style={styles.label}>Authorized Signature:</Text>
          <Image
            src={signaturePreview}
            style={styles.signature}
          />
        </View>
      )}

      <View style={styles.footer}>
        <Text>This is a computer-generated receipt.</Text>
      </View>
    </Page>
  </Document>
);

export default ReceiptPDF; 