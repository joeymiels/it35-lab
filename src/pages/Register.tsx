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
  
  const Register: React.FC = () => {
    const navigation = useIonRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
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
      navigation.push('/Login', 'forward', 'replace');
    };
  
    return (
      <IonPage>
        <IonContent fullscreen className="register-content">
          <style>
            {`
              .register-content {
                background: linear-gradient(-45deg, #ff758c, #ff7eb3, #57c1eb, #7a77ff);
                background-size: 400% 400%;
                animation: gradientMove 8s ease infinite;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                text-align: center;
              }
  
              .register-box {
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
              }
            `}
          </style>
  
          <div className="register-box">
            <IonAvatar className="avatar">
              <img 
                alt="User Avatar" 
                src="https://i.pinimg.com/originals/cc/9d/d3/cc9dd3a99a069fa5a2548d8f57f4d5d8.gif" 
                style={{ width: '100%', height: '100%' }} 
              />
            </IonAvatar>
  
            <h1 style={{ color: 'white', fontWeight: 'bold', marginBottom: '20px' }}>REGISTER</h1>
  
            <IonItem style={{ width: '100%', marginBottom: '10px' }}>
              <IonInput placeholder="Enter First Name" value={firstName} onIonChange={(e) => setFirstName(e.detail.value!)} />
            </IonItem>
            <IonItem style={{ width: '100%', marginBottom: '10px' }}>
              <IonInput placeholder="Enter Last Name" value={lastName} onIonChange={(e) => setLastName(e.detail.value!)} />
            </IonItem>
            <IonItem style={{ width: '100%', marginBottom: '10px' }}>
              <IonInput placeholder="Enter Address" value={address} onIonChange={(e) => setAddress(e.detail.value!)} />
            </IonItem>
            <IonItem style={{ width: '100%', marginBottom: '10px' }}>
              <IonInput type="email" placeholder="Enter Email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
            </IonItem>
            <IonItem style={{ width: '100%', marginBottom: '10px' }}>
              <IonInput type="password" placeholder="Enter Password" value={password} onIonChange={(e) => setPassword(e.detail.value!)}>
                <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
              </IonInput>
            </IonItem>
            <IonItem style={{ width: '100%', marginBottom: '20px' }}>
              <IonInput type="password" placeholder="Confirm Password" value={confirmPassword} onIonChange={(e) => setConfirmPassword(e.detail.value!)}>
                <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
              </IonInput>
            </IonItem>
  
            <IonButton onClick={doRegister} expand="full" style={{ width: '100%', marginBottom: '10px' }}>
              REGISTER
            </IonButton>
            <IonButton onClick={() => navigation.push('/Login', 'back', 'replace')} expand="full" color="secondary" style={{ width: '100%' }}>
              BACK TO LOGIN
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Register;
  