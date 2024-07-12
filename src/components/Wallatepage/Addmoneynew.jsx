import React, { useState } from 'react';
import axios from 'axios';

const AddMoneyForm = () => {
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Amount validate karein
    const amountValue = parseFloat(amount);
    if (amountValue < 100 || amountValue > 5000 || isNaN(amountValue)) {
      setErrorMessage('Amount 100 se 5000 Rs. ke beech hona chahiye.');
      return;
    }

    try {
      setLoading(true);

      // localStorage se token retrieve karein
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Token nahi mila. Dubara login karein.');
        return;
      }

      // API call money add karne ke liye
      const response = await axios.post(`http://localhost:8000/wallet/addMoney`, 
        { amount: amountValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Form aur error message clear karein
      setAmount('');
      setErrorMessage('');

      // Success notification dikhaye
      alert(`Successfully added ${amountValue} Rs.`);
    } catch (error) {
      console.error('Error adding money:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Paise add karne me dikkat aayi. Dubara koshish karein.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8">
      <div className="bg-white shadow-lg rounded-lg p-20 w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">Paise Add Karein</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row items-center lg:items-start">
            <div className="flex-1">
              <div className="mb-6">
                <label htmlFor="amount" className="font-bold text-xl text-gray-700 mb-2">
                  Rakam <span className="text-red-600">(Min 100rs. Max 5000rs.)</span>
                </label>
                <br />
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Rakam Daalen"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  min="100"
                  max="5000"
                  required
                />
              </div>
              {errorMessage && (
                <div className="text-red-600 mb-4 text-center">{errorMessage}</div>
              )}
              <div className="mb-6">
                <button
                  type="submit"
                  className={`w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Paise Add Karein'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMoneyForm;
