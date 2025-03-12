import { 
    IonButtons,
      IonCard,
      IonCardContent,
      IonCardHeader,
      IonCardSubtitle,
      IonCardTitle,
      IonContent, 
      IonHeader, 
      IonMenuButton, 
      IonPage, 
      IonTitle, 
      IonToolbar 
  } from '@ionic/react';
  
  const Feed: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Feed</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <IonCard>
      <IonCardHeader>
        <IonCardTitle>BIBLE VERSES</IonCardTitle>
        <IonCardSubtitle>Scripture Spotlight</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent></IonCardContent>
    </IonCard>
    <IonCard>
      <img alt="Silhouette of mountains" src="https://dailyverses.net/images/en/niv/proverbs-16-3-2.jpg" />
      <IonCardHeader>
        <IonCardTitle>proverbs-16-3-2</IonCardTitle>
        <IonCardSubtitle></IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent></IonCardContent>
    </IonCard>
    <IonCard>
      <img alt="Silhouette of mountains" src="https://dailyverses.net/images/en/niv/philippians-4-6-7-3.jpg" />
      <IonCardHeader>
        <IonCardTitle>philippians-4-6-7-3</IonCardTitle>
        <IonCardSubtitle></IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent></IonCardContent>
    </IonCard>
    <IonCard>
      <img alt="Silhouette of mountains" src="https://dailyverses.net/images/en/niv/isaiah-40-31-2.jpg" />
      <IonCardHeader>
        <IonCardTitle>isaiah-40-31-2</IonCardTitle>
        <IonCardSubtitle></IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent></IonCardContent>
    </IonCard>
    <IonCard>
      <img alt="Silhouette of mountains" src="https://dailyverses.net/images/en/niv/isaiah-41-10-2.jpg" />
      <IonCardHeader>
        <IonCardTitle>isaiah-41-10-2</IonCardTitle>
        <IonCardSubtitle></IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent></IonCardContent>
    </IonCard>
    <IonCard>
      <img alt="Silhouette of mountains" src="https://dailyverses.net/images/en/niv/deuteronomy-6-6-7-4.jpg" />
      <IonCardHeader>
        <IonCardTitle>deuteronomy-6-6-7-4</IonCardTitle>
        <IonCardSubtitle></IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent></IonCardContent>
    </IonCard>


        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
        </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Feed;