import React, { useState } from 'react';
import './FitnessTracker.css';

const FitnessTracker = () => {
  // User data
  const userData = {
    name: "Alex Johnson",
    age: 28,
    weight: 68, // kg
    goal: "Lose 5kg by December"
  };

  // State for fitness metrics
  const [fitnessData, setFitnessData] = useState({
    steps: 6543,
    stepsGoal: 10000,
    calories: 420,
    caloriesGoal: 600,
    water: 5, // glasses
    waterGoal: 8
  });

  // Update steps
  const updateSteps = (amount) => {
    setFitnessData(prev => ({
      ...prev,
      steps: Math.max(0, prev.steps + amount)
    }));
  };

  // Update calories
  const updateCalories = (amount) => {
    setFitnessData(prev => ({
      ...prev,
      calories: Math.max(0, prev.calories + amount)
    }));
  };

  // Update water intake
  const updateWater = (amount) => {
    setFitnessData(prev => ({
      ...prev,
      water: Math.max(0, prev.water + amount)
    }));
  };

  // Calculate percentages for progress bars
  const stepsPercentage = (fitnessData.steps / fitnessData.stepsGoal) * 100;
  const caloriesPercentage = (fitnessData.calories / fitnessData.caloriesGoal) * 100;
  const waterPercentage = (fitnessData.water / fitnessData.waterGoal) * 100;

  return (
    <div className="container">
      <header>
        <h1 className="app-title">FitLife Tracker</h1>
        <p className="app-subtitle">Track your fitness journey in real-time</p>
        
        <div className="user-info">
          <div className="user-avatar">AJ</div>
          <div className="user-details">
            <div className="user-name">{userData.name}</div>
            <div className="user-goal">{userData.goal}</div>
          </div>
        </div>
      </header>
      
      <div className="dashboard">
        {/* Steps Tracker Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">
              <i className="fas fa-walking card-icon"></i>
              Steps
            </h2>
          </div>
          
          <div className="stats-container">
            <div className="stat-value">{fitnessData.steps.toLocaleString()}</div>
            <div className="stat-label">steps today</div>
            
            <div className="progress-container">
              <div 
                className="progress-bar steps-progress" 
                style={{ width: `${Math.min(stepsPercentage, 100)}%` }}
              ></div>
            </div>
            
            <div className="progress-text">
              <span>0</span>
              <span>Goal: {fitnessData.stepsGoal.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="controls">
            <button className="control-btn" onClick={() => updateSteps(1000)}>
              <i className="fas fa-plus"></i> 1K
            </button>
            <button className="control-btn" onClick={() => updateSteps(500)}>
              <i className="fas fa-plus"></i> 500
            </button>
            <button className="control-btn" onClick={() => updateSteps(-500)}>
              <i className="fas fa-minus"></i> 500
            </button>
          </div>
        </div>
        
        {/* Calories Tracker Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">
              <i className="fas fa-fire card-icon"></i>
              Calories
            </h2>
          </div>
          
          <div className="stats-container">
            <div className="stat-value">{fitnessData.calories}</div>
            <div className="stat-label">calories burned</div>
            
            <div className="progress-container">
              <div 
                className="progress-bar calories-progress" 
                style={{ width: `${Math.min(caloriesPercentage, 100)}%` }}
              ></div>
            </div>
            
            <div className="progress-text">
              <span>0</span>
              <span>Goal: {fitnessData.caloriesGoal}</span>
            </div>
          </div>
          
          <div className="controls">
            <button className="control-btn" onClick={() => updateCalories(50)}>
              <i className="fas fa-plus"></i> 50
            </button>
            <button className="control-btn" onClick={() => updateCalories(10)}>
              <i className="fas fa-plus"></i> 10
            </button>
            <button className="control-btn" onClick={() => updateCalories(-10)}>
              <i className="fas fa-minus"></i> 10
            </button>
          </div>
        </div>
        
        {/* Water Intake Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">
              <i className="fas fa-tint card-icon"></i>
              Water Intake
            </h2>
          </div>
          
          <div className="stats-container">
            <div className="stat-value">{fitnessData.water}</div>
            <div className="stat-label">glasses today</div>
            
            <div className="progress-container">
              <div 
                className="progress-bar water-progress" 
                style={{ width: `${Math.min(waterPercentage, 100)}%` }}
              ></div>
            </div>
            
            <div className="progress-text">
              <span>0</span>
              <span>Goal: {fitnessData.waterGoal}</span>
            </div>
          </div>
          
          <div className="controls">
            <button className="control-btn" onClick={() => updateWater(1)}>
              <i className="fas fa-plus"></i> 1 Glass
            </button>
            <button className="control-btn" onClick={() => updateWater(-1)}>
              <i className="fas fa-minus"></i> 1 Glass
            </button>
          </div>
        </div>
      </div>
      
      <div className="summary-section">
        <h2 className="summary-title">
          <i className="fas fa-chart-line summary-icon"></i>
          Today's Summary
        </h2>
        
        <div className="summary-grid">
          <div className="summary-item">
            <div className="summary-value">{fitnessData.steps.toLocaleString()}</div>
            <div className="summary-label">Steps</div>
            {fitnessData.steps >= fitnessData.stepsGoal && (
              <div className="achievement">
                <i className="fas fa-trophy"></i> Goal Achieved!
              </div>
            )}
          </div>
          
          <div className="summary-item">
            <div className="summary-value">{fitnessData.calories}</div>
            <div className="summary-label">Calories Burned</div>
            {fitnessData.calories >= fitnessData.caloriesGoal && (
              <div className="achievement">
                <i className="fas fa-trophy"></i> Goal Achieved!
              </div>
            )}
          </div>
          
          <div className="summary-item">
            <div className="summary-value">{fitnessData.water}</div>
            <div className="summary-label">Glasses of Water</div>
            {fitnessData.water >= fitnessData.waterGoal && (
              <div className="achievement">
                <i className="fas fa-trophy"></i> Goal Achieved!
              </div>
            )}
          </div>
          
          <div className="summary-item">
            <div className="summary-value">
              {Math.round((fitnessData.steps / fitnessData.stepsGoal * 100))}%
            </div>
            <div className="summary-label">Daily Completion</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessTracker;