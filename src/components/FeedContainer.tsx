import React, { useState } from 'react';
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
  IonCardContent,
  useIonToast
} from '@ionic/react';

const Home: React.FC = () => {
  const [shift, setShift] = useState<number>(3);
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [report, setReport] = useState<string | null>(null);
  const [present] = useIonToast();

  const caesarEncrypt = (text: string, shift: number): string => {
    return text
      .split('')
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          let code = char.charCodeAt(0);
          if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
          } else if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + shift) % 26) + 97);
          }
        }
        return char;
      })
      .join('');
  };

  const caesarDecrypt = (text: string, shift: number): string => {
    return text
      .split('')
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          let code = char.charCodeAt(0);
          if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
          } else if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
          }
        }
        return char;
      })
      .join('');
  };

  const handleEncrypt = () => {
    const encrypted = caesarEncrypt(text, shift);
    const message = `🔐 Encrypted: ${encrypted}`;
    setResult(message);
    setHistory((prev) => [message, ...prev]);
    setReport(null);
    present('Text encrypted successfully!', 2000);
  };

  const handleDecrypt = () => {
    const decrypted = caesarDecrypt(text, shift);
    const message = `🔓 Decrypted: ${decrypted}`;
    setResult(message);
    setHistory((prev) => [message, ...prev]);
    setReport(null);
    present('Text decrypted successfully!', 2000);
  };

  const handleGenerateReport = () => {
    if (!result) {
      present('No result available to generate report.', 2000);
      return;
    }
    const reportContent = `📄 Caesar Cipher Report\n\nShift: ${shift}\nInput: ${text}\nResult: ${result}`;
    setReport(reportContent);
    present('Report generated successfully!', 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
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
            color="secondary"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Enter Text</IonLabel>
          <IonTextarea
            rows={6}
            value={text}
            onIonChange={(e) => setText(e.detail.value!)}
            color="tertiary"
          />
        </IonItem>

        <IonButton expand="block" color="success" onClick={handleEncrypt}>
          Encrypt
        </IonButton>

        <IonButton expand="block" color="warning" onClick={handleDecrypt}>
          Decrypt
        </IonButton>

        <IonButton expand="block" color="medium" onClick={handleGenerateReport}>
          Generate Report
        </IonButton>

        <IonText color="dark">
          <h3 style={{ marginTop: '20px', color: '#3880ff' }}>{result}</h3>
        </IonText>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>History</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {history.length > 0 ? (
              history.map((entry, index) => (
                <p
                  key={index}
                  style={{
                    padding: '10px',
                    borderRadius: '5px',
                    backgroundColor: '#e0e0e0',
                    cursor: 'pointer',
                    margin: '5px 0',
                  }}
                  onClick={() => present(entry, 2000)}
                >
                  {entry}
                </p>
              ))
            ) : (
              <p>No history yet.</p>
            )}
          </IonCardContent>
        </IonCard>

        {report && (
          <IonCard color="light">
            <IonCardHeader>
              <IonCardTitle>Generated Report</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{report}</pre>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
