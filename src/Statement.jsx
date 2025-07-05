import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import styles from "./Statement.module.css";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const Statement = () => {
  const [activeTab, setActiveTab] = useState('All Transactions');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('Last 6 months');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [allTransactions, setAllTransactions] = useState([]);
  const [summaryData, setSummaryData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [editingTxnId, setEditingTxnId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        setAllTransactions([
          { id: 1, date: 'Mar 12', description: 'Rent', amount: 234.00, category: 'Supplies', balance: 27584.66, type: 'Withdrawals' },
          { id: 2, date: 'Mar 13', description: 'Client Payment', amount: 1200.00, category: 'Income', balance: 28784.66, type: 'Deposits' },
          { id: 3, date: 'Mar 14', description: 'medicine', amount: 150.00, category: '', balance: 28634.66, type: 'Uncategorized' },
          { id: 4, date: 'Mar 15', description: 'Pending Transfer', amount: 500.00, category: 'Pending', balance: 28134.66, type: 'Pending' },
          { id: 5, date: 'Mar 16', description: 'Bills', amount: 234.00, category: '', balance: 27900.66, type: 'Withdrawals' },
          { id: 6, date: 'Mar 17', description: 'Salary Credit', amount: 10500.00, category: 'Income', balance: 7584.66, type: 'Deposits' },
          { id: 7, date: 'Mar 18', description: 'Subscription Charges', amount: 234.00, category: '', balance: 38400.66, type: 'Withdrawals' },
        ]);

        setSummaryData({
          currentBalance: 32518.47,
          incomeMTD: 12650.00,
          expensesMTD: 9395.82
        });

        setChartData([
          { month: 'Oct', balance: 22000 },
          { month: 'Nov', balance: 23500 },
          { month: 'Dec', balance: 20000 },
          { month: 'Jan', balance: 28000 },
          { month: 'Feb', balance: 30500 },
          { month: 'Mar', balance: 32500 },
        ]);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeRange, categoryFilter]);

  const filteredTransactions = activeTab === 'All Transactions'
    ? allTransactions
    : allTransactions.filter(txn => txn.type === activeTab);

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  const handleExport = async (format) => {
    try {
      console.log(`Exporting as ${format}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <div className={styles.loading}>Loading dashboard...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.pageContainer}>
      <Navigation />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Statements</h2>
          <div className={styles.filters}>
            <select>
              <option>Personal Checking</option>
            </select>
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option>Last 6 months</option>
              <option>Last 3 months</option>
              <option>Last month</option>
            </select>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option>All Categories</option>
              <option>Debit payments</option>
              <option>Transportation</option>
            </select>
            <button className={styles.addAccount}>+ Add Statement</button>
          </div>
        </div>

        {summaryData && (
          <div className={styles.summaryCards}>
            <div className={styles.card}>
              <p>Current Balance</p>
              <h3>${summaryData.currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
              <span className={styles.green}>↑ $3,254.18 vs. Last Month</span>
            </div>
            <div className={styles.card}>
              <p>Income (MTD)</p>
              <h3>${summaryData.incomeMTD.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
              <span className={styles.green}>↑ 8.2% vs. Last Month</span>
            </div>
            <div className={styles.card}>
              <p>Expenses (MTD)</p>
              <h3>${summaryData.expensesMTD.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
              <span className={styles.red}>↑ 5.3% vs. Last Month</span>
            </div>
          </div>
        )}

        <div className={styles.balanceHistory}>
          <h4>Balance History</h4>
          <div className={styles.chartPlaceholder}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Balance"]} />
                <Line type="monotone" dataKey="balance" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.transactions}>
          <h4>Recent Transactions</h4>
          <div className={styles.tabs}>
            {['All Transactions', 'Deposits', 'Withdrawals', 'Uncategorized', 'Pending'].map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={activeTab === tab ? styles.activeTab : ''}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.transactionTable}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map(txn => (
                  <tr key={txn.id}>
                    <td>{txn.date}</td>
                    <td>{txn.description}</td>
                    <td className={txn.type === 'Deposits' ? styles.green : styles.red}>
                      {txn.type === 'Deposits' ? '+' : '-'}${Math.abs(txn.amount).toFixed(2)}
                    </td>
                    <td>{txn.category || '—'}</td>
                    <td>${txn.balance.toFixed(2)}</td>
                    <td>
                      {editingTxnId === txn.id ? (
                        <div>
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                          >
                            <option value="">Select Category</option>
                            <option value="Supplies">Supplies</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Income">Income</option>
                            <option value="Medical">Medical</option>
                          </select>
                          <button
                            onClick={() => {
                              const updated = allTransactions.map(t =>
                                t.id === txn.id ? { ...t, category: selectedCategory } : t
                              );
                              setAllTransactions(updated);
                              setEditingTxnId(null);
                              setSelectedCategory('');
                            }}
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          className={styles.categorizeBtn}
                          onClick={() => {
                            setEditingTxnId(txn.id);
                            setSelectedCategory(txn.category || '');
                          }}
                        >
                          {txn.category ? 'Recategorize' : 'Categorize'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>← Previous</button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? styles.activePage : ''}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next →</button>
          </div>
        </div>

        <div className={styles.statementActions}>
          <button onClick={() => handleExport('PDF')}>Download PDF</button>
          <button onClick={() => handleExport('CSV')}>Export CSV</button>
          <button onClick={() => handleExport('PRINT')}>Print Statement</button>
        </div>
      </div>
    </div>
  );
};

export default Statement;