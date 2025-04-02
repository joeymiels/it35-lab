import {
    IonAvatar,
    IonButton,
    IonContent,
    IonInput,
    IonInputPasswordToggle,
    IonItem,
    IonPage,
    useIonRouter
  } from '@ionic/react';
  import React, { useState } from 'react';
  
  const Auth: React.FC = () => {
    const navigation = useIonRouter();
    const [isLogin, setIsLogin] = useState(true); // To toggle between login and register modes
  
    // Login state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    // Register state variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const doLogin = () => {
      if (!email || !password) {
        alert('Please enter your email and password.');
        return;
      }
      navigation.push('/it35-lab/app', 'forward', 'replace'); // Navigate to the main app after login
    };
  
    const doRegister = () => {
      if (!firstName || !lastName || !address || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
      }
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      alert('Registration successful!');
      navigation.push('/Login', 'forward', 'replace'); // Navigate to login page after registration
    };
  
    return (
      <IonPage>
        <IonContent fullscreen className={isLogin ? 'login-content' : 'register-content'}>
          <style>
            {`
              .login-content, .register-content {
                background: linear-gradient(-45deg, #ff758c, #ff7eb3, #57c1eb, #7a77ff);
                background-size: 400% 400%;
                animation: gradientMove 8s ease infinite;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                text-align: center;
              }
  
              .auth-box {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 90%;
                max-width: 400px;
                background: rgba(255, 255, 255, 0.2);
                padding: 40px;
                border-radius: 15px;
                backdrop-filter: blur(10px);
                box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
                text-align: center;
                animation: fadeIn 1s ease-in-out;
              }
  
              @keyframes fadeIn {
                0% { opacity: 0; transform: translate(-50%, -60%); }
                100% { opacity: 1; transform: translate(-50%, -50%); }
              }
  
              .avatar {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                animation: bounce 2s infinite;
              }
  
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
            `}
          </style>
  
          <div className="auth-box">
            <IonAvatar className="avatar">
              <img
                alt="User Avatar"
                src="https://i.pinimg.com/originals/cc/9d/d3/cc9dd3a99a069fa5a2548d8f57f4d5d8.gif"
                style={{ width: '100%', height: '100%' }}
              />
            </IonAvatar>
  
            <h1 style={{ color: 'white', fontWeight: 'bold', marginBottom: '20px' }}>
              {isLogin ? 'USER LOGIN' : 'REGISTER'}
            </h1>
  
            {!isLogin && (
              <>
                <IonItem style={{ width: '100%', marginBottom: '10px' }}>
                  <IonInput placeholder="Enter First Name" value={firstName} onIonChange={(e) => setFirstName(e.detail.value!)} />
                </IonItem>
                <IonItem style={{ width: '100%', marginBottom: '10px' }}>
                  <IonInput placeholder="Enter Last Name" value={lastName} onIonChange={(e) => setLastName(e.detail.value!)} />
                </IonItem>
                <IonItem style={{ width: '100%', marginBottom: '10px' }}>
                  <IonInput placeholder="Enter Address" value={address} onIonChange={(e) => setAddress(e.detail.value!)} />
                </IonItem>
              </>
            )}
  
            <IonItem style={{ width: '100%', marginBottom: '10px' }}>
              <IonInput
                type="email"
                placeholder="Enter Email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>
  
            <IonItem style={{ width: '100%', marginBottom: '10px' }}>
              <IonInput
                type="password"
                placeholder="Enter Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonItem>
  
            {!isLogin && (
              <IonItem style={{ width: '100%', marginBottom: '20px' }}>
                <IonInput
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                >
                  <IonInputPasswordToggle slot="end" />
                </IonInput>
              </IonItem>
            )}
  
            <IonButton
              onClick={isLogin ? doLogin : doRegister}
              expand="full"
              style={{ width: '100%', marginBottom: '10px' }}
            >
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </IonButton>
  
            <IonButton
              onClick={() => {
                setIsLogin(!isLogin);
                setFirstName('');
                setLastName('');
                setAddress('');
                setConfirmPassword('');
              }}
              expand="full"
              color="secondary"
              style={{ width: '100%' }}
            >
              {isLogin ? 'SIGNUP' : 'BACK TO LOGIN'}
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Auth;