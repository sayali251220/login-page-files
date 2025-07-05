import React, { useState } from 'react';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  // Password validation function
  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters long';
    if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
    return '';
  };

  // Handle email change with validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (touched.email) {
      setErrors(prev => ({
        ...prev,
        email: validateEmail(value)
      }));
    }
  };

  // Handle password change with validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    if (touched.password) {
      setErrors(prev => ({
        ...prev,
        password: validatePassword(value)
      }));
    }
  };

  // Handle input blur (when user clicks away)
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    if (field === 'email') {
      setErrors(prev => ({
        ...prev,
        email: validateEmail(email)
      }));
    } else if (field === 'password') {
      setErrors(prev => ({
        ...prev,
        password: validatePassword(password)
      }));
    }
  };

  const handleLogin = () => {
    // Validate all fields
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setErrors({
      email: emailError,
      password: passwordError
    });
    
    setTouched({
      email: true,
      password: true
    });
    
    // If no errors, proceed with login
    if (!emailError && !passwordError) {
      console.log('Login successful:', { email, password, rememberMe });
      alert('Login successful! (Check console for details)');
    } else {
      console.log('Login failed due to validation errors');
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.loginForm}>
          <h1 className={styles.title}>Welcome back!</h1>
          <p className={styles.subtitle}>Enter your Credentials to access your account</p>
          
          <div className={styles.formContainer}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => handleBlur('email')}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>
            
            <div className={styles.inputGroup}>
              <div className={styles.passwordHeader}>
                <label className={styles.label}>Password</label>
                <a href="/forgot-password" className={styles.forgotPassword}>Forgot password?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => handleBlur('password')}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>
            
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkbox}
              />
              <label htmlFor="remember" className={styles.checkboxLabel}>
                Remember for 30 days
              </label>
            </div>
            
            <button onClick={handleLogin} className={styles.loginButton}>
              Login
            </button>
          </div>
          
          <div className={styles.divider}>
            <span>or</span>
          </div>
          
          <button onClick={handleGoogleSignIn} className={styles.googleButton}>
            <svg className={styles.googleIcon} viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
          
          <p className={styles.signUpText}>
            Don't have an account? 
            <button onClick={handleSignUp} className={styles.signUpLink}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
      
      <div className={styles.rightSection}>
        <div className={styles.promoBox}>
          <h2 className={styles.promoTitle}>Build LLM Pipeline For Free</h2>
          <div className={styles.promoFeatures}>
            <p>No credit card required</p>
            <p>Up to 100 queries per month with basic LLM models</p>
            <p>Set up your LLM pipeline within minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;