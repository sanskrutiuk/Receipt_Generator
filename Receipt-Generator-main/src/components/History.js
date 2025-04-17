import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './History.css';
import { FaDownload, FaWhatsapp, FaEnvelope, FaEllipsisV } from 'react-icons/fa';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReceiptPDF from './ReceiptPDF';

const History = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/receipts');
        setReceipts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch receipts');
        setLoading(false);
        console.error(err);
      }
    };

    fetchReceipts();
  }, []);

  if (loading) return <div className="no-transactions"><p>Loading receipts...</p></div>;
  if (error) return <div className="no-transactions"><p>{error}</p></div>;
  if (receipts.length === 0) return <div className="no-transactions"><p>No receipts found.</p></div>;

  return (
    <div className="history-container">
      <h1>History of Transactions</h1>
      <div className="table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Full Name</th>
              <th>Amount Paid</th>
              <th>Date of Transaction</th>
              <th>Download</th>
              <th>WhatsApp</th>
              <th>Mail</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((receipt, index) => (
              <tr key={receipt._id}>
                <td>{receipts.length - index}</td>
                <td>{receipt.billToName}</td>
                <td>₹{parseFloat(receipt.amount || 0).toFixed(2)}</td>
                <td>{receipt.date}</td>
                <td>
                  <PDFDownloadLink
                    document={<ReceiptPDF formData={receipt} signaturePreview={receipt.signature} />}
                    fileName={`receipt-${receipt.receiptId}.pdf`}
                    className="action-btn download-btn"
                  >
                    {({ loading }) =>
                      loading ? (
                        <span>...</span>
                      ) : (
                        <FaDownload color="white" />
                      )
                    }
                  </PDFDownloadLink>
                </td>
                <td>
                  <a
                    href={`https://wa.me/?text=Here is your receipt: Receipt ID ${receipt.receiptId}, ₹${receipt.amount}, Date: ${receipt.date}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn whatsapp-btn"
                  >
                    <FaWhatsapp color="#25D366" />
                  </a>
                </td>
                <td>
                  <a
                    href={`mailto:${receipt.billToEmail}?subject=Your Receipt&body=Receipt ID: ${receipt.receiptId}%0D%0AAmount: ₹${receipt.amount}%0D%0ADate: ${receipt.date}`}
                    className="action-btn email-btn"
                  >
                    <FaEnvelope color="#e91e63" />
                  </a>
                </td>
                <td>
                  <button className="action-btn more-btn">
                    <FaEllipsisV color="#666" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
