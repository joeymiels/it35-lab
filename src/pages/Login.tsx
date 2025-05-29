import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonToast,
  useIonRouter,
  IonRange
} from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [sliderVerified, setSliderVerified] = useState(false);

  // Detection security states
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const doLogin = async () => {
    if (lockoutTimer) return;

    if (!sliderVerified) {
      setAlertMessage('Please complete the slide CAPTCHA first.');
      setShowAlert(true);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);

      if (newFailedAttempts >= 2) {
        setLockoutTimer(true);
        setAlertMessage("Too many failed attempts. Please wait 10 seconds.");
        setShowAlert(true);
        let secondsLeft = 10;

        const countdownInterval = setInterval(() => {
          secondsLeft -= 1;
          setCountdown(secondsLeft);

          if (secondsLeft <= 0) {
            clearInterval(countdownInterval);
            setFailedAttempts(0);
            setLockoutTimer(false);
            setCountdown(10);
          }
        }, 1000);
      } else {
        setAlertMessage(error.message);
        setShowAlert(true);
      }

      return;
    }

    // Successful login
    setFailedAttempts(0);
    setShowToast(true);
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        className="ion-padding"
        style={{
          backgroundImage: 'url("/HD-wallpaper-merry-go-ocean-peace-sky-one-piece-cool-ship-blue.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div
          style={{
            maxWidth: '400px',
            margin: 'auto',
            marginTop: '15%',
            padding: '20px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgb(23, 91, 236)',
            backgroundImage: 'url("https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExODJ1ZTZianhtNjA1YXZ1enU4bjNuNTRzbGNqb21uczFkeHdub3k0YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/C3brYLms1bhv2/200.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: '#fff'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '20px'
            }}
          >
            <IonAvatar
              style={{
                width: '120px',
                height: '120px',
                marginBottom: '20px',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img
                src="https://i.pinimg.com/736x/1d/63/d8/1d63d82c1f5dd9c2f4974a31a206835a.jpg"
                alt="One Piece Logo"
                style={{
                  width: '100px',
                  height: '100px',
                  animation: 'float 1s ease-in-out infinite',
                  borderRadius: '50%'
                }}
              />
            </IonAvatar>

            <style>
              {`
                @keyframes float {
                  0% { transform: translateY(0px); }
                  50% { transform: translateY(-5px); }
                  100% { transform: translateY(0px); }
                }
              `}
            </style>

            <h1 style={{ margin: '0', fontWeight: 'bold', color: '#FFD700' }}>WELCOME PIRATE</h1>
          </div>

          <IonInput
            label="Email"
            labelPlacement="floating"
            fill="outline"
            type="email"
            placeholder="Enter Email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
            style={{ color: '#fff' }}
          />
          <IonInput
            style={{ marginTop: '15px', color: '#fff' }}
            fill="outline"
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
          >
            <IonInputPasswordToggle slot="end" />
          </IonInput>

          {/* SLIDE CAPTCHA */}
          <div style={{ marginTop: '20px', color: '#FFD700', fontWeight: 'bold' }}>Slide to verify</div>
          <IonRange
            min={0}
            max={100}
            step={1}
            snaps={false}
            pin={true}
            color={sliderVerified ? 'success' : 'warning'}
            onIonChange={(e) => {
              const value = e.detail.value as number;
              setSliderVerified(value >= 100);
            }}
          />

          <IonButton
            onClick={doLogin}
            expand="block"
            shape="round"
            color="warning"
            style={{ marginTop: '25px' }}
            disabled={lockoutTimer}
          >
            {lockoutTimer ? `Wait ${countdown}s...` : 'Login'}
          </IonButton>

          <IonButton
            routerLink="/it35-lab/register"
            expand="block"
            fill="clear"
            shape="round"
            color="light"
            style={{ marginTop: '10px' }}
          >
            Don't have an account? Register here
          </IonButton>
        </div>

        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
