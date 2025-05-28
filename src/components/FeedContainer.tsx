import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonTextarea,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/react';

const Home: React.FC = () => {
  const [shift, setShift] = useState<number>(3);
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);

  const caesarEncrypt = (text: string, shift: number): string => {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        let code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
      }
      return char;
    }).join('');
  };

  const caesarDecrypt = (text: string, shift: number): string => {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        let code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
        }
      }
      return char;
    }).join('');
  };

  const handleEncrypt = () => {
    const encrypted = caesarEncrypt(text, shift);
    setResult("🔐 Encrypted: " + encrypted);
    setHistory(prev => ["Encrypted: " + encrypted, ...prev]);
  };

  const handleDecrypt = () => {
    const decrypted = caesarDecrypt(text, shift);
    setResult("🔓 Decrypted: " + decrypted);
    setHistory(prev => ["Decrypted: " + decrypted, ...prev]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Text Encryption & Decryption</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Enter Shift Value</IonLabel>
          <IonInput
            type="number"
            value={shift}
            onIonChange={(e) => setShift(parseInt(e.detail.value!, 10) || 0)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Enter Text</IonLabel>
          <IonTextarea
            rows={6}
            value={text}
            onIonChange={(e) => setText(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" onClick={handleEncrypt}>
          Encrypt
        </IonButton>

        <IonButton expand="block" color="medium" onClick={handleDecrypt}>
          Decrypt
        </IonButton>

        <IonText color="dark">
          <h3 style={{ marginTop: '20px' }}>{result}</h3>
        </IonText>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>History</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {history.length > 0 ? history.map((entry, index) => (
              <p key={index}>{entry}</p>
            )) : <p>No history yet.</p>}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
