import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import styles from "./Expenses.module.css";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, 
  PieChart, Pie, Cell, BarChart, Bar, Legend, 
  ResponsiveContainer
} from "recharts";


const fetchMonthlyExpenses = async () => {
  
  return [
    { name: "Apr", value: 4000 },
    { name: "May", value: 4200 },
    { name: "Jun", value: 3900 },
    { name: "Jul", value: 4500 },
    { name: "Aug", value: 4700 },
    { name: "Sep", value: 4600 },
    { name: "Oct", value: 4400 },
    
  ];
};


const fetchExpenseCategories = async () => {
  
  return [
    { name: "Office Rent", value: 26.5, color: "#FF6B6B" },
    { name: "Services", value: 22.3, color: "#5FBEFF" },
    { name: "Travel", value: 18.7, color: "#FFAB40" },
    { name: "Marketing", value: 15.8, color: "#A55EEA" },
    { name: "Other", value: 16.7, color: "#5FD16E" },
  ];
};


const fetchBudgetData = async () => {
  
  return [
    { category: "Office rent", budget: 4000, actual: 3000 },
    { category: "Travel", budget: 3500, actual: 3000 },
    { category: "Shopping", budget: 3000, actual: 2600 },
    { category: "Other", budget: 2800, actual: 2300 },
  ];
};


const fetchSummaryStats = async () => {
  
  return {
    totalExpenses: 45290,
    deductibleAmount: 12840,
    topCategory: { name: "Rent", amount: 12000, percentage: 26.5 },
  };
};

const Expenses = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [monthly, categories, budget, stats] = await Promise.all([
          fetchMonthlyExpenses(),
          fetchExpenseCategories(),
          fetchBudgetData(),
          fetchSummaryStats(),
        ]);
        setMonthlyData(monthly);
        setPieData(categories);
        setBarData(budget);
        setSummary(stats);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [selectedMonth]); // Refetch when month changes

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.pagesContainer}>
        <Navigation />
    <div className={styles.expenses}>
      <h2 className={styles.title}>Expenses</h2>
      
      
      <select 
        value={selectedMonth} 
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="">All Months</option>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i + 1}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>
      
      
      <div className={styles.summaryCards}>
        <div className={styles.card}>
          <h2>Total Expenses</h2>
          <p>${summary?.totalExpenses?.toLocaleString() || "N/A"}</p>
          <span>Apr - Oct 2024</span>
        </div>
        <div className={styles.card}>
          <h2>Deductible Amount</h2>
          <p>${summary?.deductibleAmount?.toLocaleString() || "N/A"}</p>
          <span>28.4% of expenses</span>
        </div>
        <div className={styles.card}>
          <h2>Top Category</h2>
          <p>{summary?.topCategory?.name || "N/A"}</p>
          <span>
            ${summary?.topCategory?.amount?.toLocaleString()} 
            ({summary?.topCategory?.percentage}% of total)
          </span>
        </div>
      </div>

      
      <div className={styles.chartContainer}>
        <div className={styles.chartRow}>
          <div className={styles.chartCard} style={{ width: "100%" }}>
            <h4>Monthly Expenses Trend</h4>
            <ResponsiveContainer width="100%" height={300}>
            <LineChart 
              data={monthlyData}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
              formatter={(value) => [`Amount: ${value}`, '']}
            />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#FF6B6B" 
                 
              />
            </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartRow}>
          <div className={styles.chartCard}>
            <h4>Budget vs. Actual</h4>
            <ResponsiveContainer  width="100%" height={250}>
            <BarChart data={barData} layout="vertical" margin={{top:20,left:40}}
           >
              
              <XAxis type="number" />
              <YAxis dataKey="category" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="actual" fill="#E57373" name="Actual" />
              <Bar dataKey="budget" fill="#64B5F6" name="Budget" />
            </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartCard}>
            <h4>Expense Categories</h4>
            <ResponsiveContainer width="100%" height={300}>
            <PieChart margin={{top:0,right:0,left:0,bottom:0}}>
              <Pie 
                data={pieData} 
                dataKey="value" 
                nameKey="name"
                outerRadius={window.innerWidth<400 ? 90:110} 
                label={({name,percent}) => `${name} (${(percent*100).toFixed(1)}%)`}
                >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              
            </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Expenses;