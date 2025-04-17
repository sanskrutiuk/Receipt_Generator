import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import History from './components/History';
import About from './components/About';
import Login from './components/Login';
import './App.css';
import '../src/components/ReceiptPreview.css';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReceiptPDF from './components/ReceiptPDF';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    receiptId: '', date: '', fromName: '', fromEmail: '',
    billToName: '', billToEmail: '', billToAddress: '', billToPhone: '',
    description: '', amount: '', notes: '', signature: null
  });
  const [isEditing, setIsEditing] = useState(true);
  const [signaturePreview, setSignaturePreview] = useState('');

  const validateEmail = (email) => email.includes('@');
  const validatePhone = (phone) => phone.length === 10 && /^\d+$/.test(phone);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fromName.trim()) newErrors.fromName = 'From name is required';
    if (!formData.fromEmail.trim()) newErrors.fromEmail = 'From email is required';
    else if (!validateEmail(formData.fromEmail)) newErrors.fromEmail = 'Invalid email';

    if (!formData.billToName.trim()) newErrors.billToName = 'Bill To name is required';
    if (!formData.billToEmail.trim()) newErrors.billToEmail = 'Bill To email is required';
    else if (!validateEmail(formData.billToEmail)) newErrors.billToEmail = 'Invalid email';

    if (formData.billToPhone && !validatePhone(formData.billToPhone)) {
      newErrors.billToPhone = 'Phone must be 10 digits';
    }

    return Object.keys(newErrors).length === 0;
  };

  const generateReceiptId = () => `REC${new Date().getTime()}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, signature: reader.result }));
        setSignaturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const receiptId = formData.receiptId || generateReceiptId();
      const newTransaction = {
        ...formData,
        receiptId,
        amount: parseFloat(formData.amount || 0),
        date: formData.date || new Date().toLocaleDateString('en-GB')
      };

      try {
        await axios.post('http://localhost:5000/api/receipts', newTransaction);
        setTransactions(prev => [newTransaction, ...prev]);
        setFormData({
          receiptId: '', date: '', fromName: '', fromEmail: '', billToName: '',
          billToEmail: '', billToAddress: '', billToPhone: '', description: '',
          amount: '', notes: '', signature: null
        });
        setSignaturePreview('');
        alert('Receipt saved successfully!');
        setCurrentPage('history');
      } catch (err) {
        console.error('Error saving receipt:', err);
      }
    }
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setCurrentPage('form');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('login');
    setFormData({
      receiptId: '', date: '', fromName: '', fromEmail: '', billToName: '',
      billToEmail: '', billToAddress: '', billToPhone: '', description: '',
      amount: '', notes: '', signature: null
    });
    setSignaturePreview('');
  };

  useEffect(() => {
    if (isAuthenticated && currentPage === 'history') {
      axios.get('http://localhost:5000/api/receipts')
        .then(res => setTransactions(res.data))
        .catch(err => console.error('Fetch error:', err));
    }
  }, [isAuthenticated, currentPage]);

  const renderContent = () => {
    if (!isAuthenticated) return <Login onLogin={handleLogin} />;
    switch (currentPage) {
      case 'history': return <History transactions={transactions} />;
      case 'about': return <About />;
      case 'form':
      default:
        return (
          <div className="receipt-maker">
            <div className="toolbar">
              <button onClick={() => setIsEditing(false)}>Preview</button>
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="form-section">
                  <label>Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-input" />
                </div>
                <div className="form-section">
                  <label>Your Name</label>
                  <input type="text" name="fromName" value={formData.fromName} onChange={handleChange} placeholder="Enter your name" className="form-input" />
                </div>

                <div className="form-section">
                  <label>Your Email</label>
                  <input type="email" name="fromEmail" value={formData.fromEmail} onChange={handleChange} placeholder="Enter your email" className="form-input" />
                </div>

                <div className="form-section">
                  <label>Recipient Name</label>
                  <input type="text" name="billToName" value={formData.billToName} onChange={handleChange} placeholder="Enter recipient's name" className="form-input" />
                </div>
                <div className="form-section">
                  <label>Recipient Phone</label>
                  <input type="text" name="billToPhone" value={formData.billToPhone} onChange={handleChange} placeholder="Enter phone number" className="form-input" />
                </div>          

                <div className="form-section">
                  <label>Recipient Email</label>
                  <input type="email" name="billToEmail" value={formData.billToEmail} onChange={handleChange} placeholder="Enter recipient's email" className="form-input" />
                </div>
                <div className="form-section">
                  <label>Recipient Address</label>
                  <textarea name="billToAddress" value={formData.billToAddress} onChange={handleChange} placeholder="Enter address" className="form-input" />
                </div>

                <div className="form-section">
                  <label>Amount</label>
                  <div className="amount-input">
                    <span>₹</span>
                    <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="0.00" />
                  </div>
                </div>

                <div className="form-section">
                  <label>Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter description" />
                </div>

                <div className="form-section">
                  <label>Signature</label>
                  <div className="signature-upload">
                    <input type="file" id="signature-upload" accept="image/*" onChange={handleSignatureUpload} className="signature-input" />
                    <label htmlFor="signature-upload" className="signature-label">
                      <span>+ Upload Signature</span>
                    </label>
                  </div>
                  {signaturePreview && <img src={signaturePreview} alt="Signature Preview" className="signature-image" />}
                </div>

                <div className="button-group">
                  <button type="submit" className="submit-btn">Save</button>
                </div>
                
              </form>
            ) : (
              <div className="receipt-preview">
                <h3>Receipt #{formData.receiptId || 'Draft'}</h3>
                <p>Date: {formData.date || new Date().toLocaleDateString('en-GB')}</p>
                <p>From: {formData.fromName} ({formData.fromEmail})</p>
                <p>To: {formData.billToName} ({formData.billToEmail})</p>
                <p>Phone: {formData.billToPhone}</p>
                <p>Address: {formData.billToAddress}</p>
                <p>Amount: ₹{formData.amount}</p>
                <p>Description: {formData.description}</p>
                <p>Notes: {formData.notes}</p>
                {signaturePreview && <img src={signaturePreview} alt="Signature" className="signature-image" />}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="App">
      {isAuthenticated && (
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} user={user} onSignOut={handleSignOut} />
      )}
      <main className={`main-content ${!isAuthenticated ? 'full-height' : ''}`}>
        {renderContent()}
      </main>
      {isAuthenticated && <Footer />}
    </div>
  );
}

export default App;