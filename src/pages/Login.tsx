import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonTitle,
  IonModal,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonAlert,
} from '@ionic/react';
import bcrypt from 'bcryptjs';
import { supabase } from '../utils/supabaseClient';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => (
  <IonAlert
    isOpen={isOpen}
    onDidDismiss={onClose}
    header="Notification"
    message={message}
    buttons={['OK']}
  />
);

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleOpenVerificationModal = async () => {
    if (!email.includes('@') || !email.includes('.')) {
      setAlertMessage("Enter a valid email address.");
      setShowAlert(true);
      return;
    }
    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      setShowAlert(true);
      return;
    }

    setShowVerificationModal(true);
  };

  const doRegister = async () => {
    setShowVerificationModal(false);
    try {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) throw new Error("Account creation failed: " + signUpError.message);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const { error: insertError } = await supabase.from('users').insert([{
        username,
        user_email: email,
        user_firstname: firstName,
        user_lastname: lastName,
        user_password: hashedPassword,
      }]);

      if (insertError) throw new Error("Failed to save user data: " + insertError.message);

      setShowSuccessModal(true);
    } catch (err) {
      setAlertMessage(err instanceof Error ? err.message : "An unknown error occurred.");
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://media3.giphy.com/media/SEaKNxJgOfU76/giphy.gif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '15px',
          padding: '20px',
          maxWidth: '900px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '15px', zIndex: 1 }} />
          <div style={{ flex: 1, color: 'white', padding: '20px', position: 'relative', zIndex: 2 }}>
            <h1 style={{ textAlign: 'center' }}>Create your account</h1>
            <IonInput label="Username" labelPlacement="stacked" fill="outline" value={username} onIonChange={e => setUsername(e.detail.value!)} style={{ marginTop: '15px' }} />
            <IonInput label="First Name" labelPlacement="stacked" fill="outline" value={firstName} onIonChange={e => setFirstName(e.detail.value!)} style={{ marginTop: '15px' }} />
            <IonInput label="Last Name" labelPlacement="stacked" fill="outline" value={lastName} onIonChange={e => setLastName(e.detail.value!)} style={{ marginTop: '15px' }} />
            <IonInput label="Email" labelPlacement="stacked" fill="outline" type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} style={{ marginTop: '15px' }} />
            <IonInput label="Password" labelPlacement="stacked" fill="outline" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} style={{ marginTop: '15px' }}>
              <IonInputPasswordToggle slot="end" />
            </IonInput>
            <IonInput label="Confirm Password" labelPlacement="stacked" fill="outline" type="password" value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value!)} style={{ marginTop: '15px' }}>
              <IonInputPasswordToggle slot="end" />
            </IonInput>
            <IonButton expand="full" shape="round" style={{ marginTop: '20px' }} onClick={handleOpenVerificationModal}>Register</IonButton>
            <IonButton routerLink="/it35-lab" expand="full" fill="clear" shape="round">Already have an account? Sign in</IonButton>
          </div>
        </div>

        {/* Verification Modal */}
        <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
          <IonContent className="ion-padding">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>User Registration Details</IonCardTitle>
                <hr />
                <IonCardSubtitle>Username</IonCardSubtitle>
                <IonCardTitle>{username}</IonCardTitle>
                <IonCardSubtitle>Email</IonCardSubtitle>
                <IonCardTitle>{email}</IonCardTitle>
                <IonCardSubtitle>Name</IonCardSubtitle>
                <IonCardTitle>{firstName} {lastName}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5px' }}>
                <IonButton fill="clear" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
                <IonButton color="primary" onClick={doRegister}>Confirm</IonButton>
              </div>
            </IonCard>
          </IonContent>
        </IonModal>

        {/* Success Modal */}
        <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
          <IonContent className="ion-padding" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
            <IonTitle>Registration Successful 🎉</IonTitle>
            <IonText>
              <p>Your account has been created successfully.</p>
              <p>Please check your email for verification.</p>
            </IonText>
            <IonButton routerLink="/it35-lab" routerDirection="back" color="primary">Go to Login</IonButton>
          </IonContent>
        </IonModal>

        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Register;
