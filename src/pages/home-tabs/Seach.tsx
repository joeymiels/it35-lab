import { 
    IonButtons,
      IonContent, 
      IonHeader, 
      IonMenuButton, 
      IonPage, 
      IonSearchbar, 
      IonTitle, 
      IonToolbar 
  } from '@ionic/react';
  
  const Search: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Search</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar></IonSearchbar>
      <IonSearchbar placeholder="Custom Placeholder"></IonSearchbar>
      <IonSearchbar disabled={true} placeholder="Disabled"></IonSearchbar>
      <IonSearchbar value="Value"></IonSearchbar>
      <IonSearchbar animated={true} placeholder="Animated"></IonSearchbar>
        <IonContent fullscreen>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Search;
