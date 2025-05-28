import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonList, IonItem, IonAvatar, IonLabel, IonModal, IonTextarea, IonAlert } from '@ionic/react';
import supabase from '../supabaseClient';
import { useUser } from '../contexts/UserContext';
import { encrypt, decrypt } from '../utils/encryption';

interface Post {
  post_id: number;
  user_id: string;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
}

const FeedContainer: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { user, username } = useUser();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('post_created_at', { ascending: false });

      if (!error && data) {
        const decryptedPosts = (data as Post[]).map(post => ({
          ...post,
          post_content: decrypt(post.post_content)
        }));
        setPosts(decryptedPosts);
      }
    };

    fetchPosts();
  }, []);

  const createPost = async () => {
    if (!postContent || !user || !username) return;

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('user_avatar_url')
      .eq('user_id', user.id)
      .single();

    if (userError) {
      console.error('Error fetching avatar:', userError);
      return;
    }

    const avatarUrl = userData?.user_avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg';
    const encryptedContent = encrypt(postContent);

    const { data, error } = await supabase
      .from('posts')
      .insert([{ post_content: encryptedContent, user_id: user.id, username, avatar_url: avatarUrl }])
      .select('*');

    if (!error && data) {
      data[0].post_content = postContent;
      setPosts([data[0] as Post, ...posts]);
    }

    setPostContent('');
  };

  const deletePost = async (postId: number) => {
    const { error } = await supabase.from('posts').delete().match({ post_id: postId });

    if (!error) {
      setPosts(posts.filter(post => post.post_id !== postId));
    }
  };

  const editPost = (post: Post) => {
    setEditingPost(post);
    setPostContent(post.post_content);
    setIsModalOpen(true);
  };

  const savePost = async () => {
    if (!postContent || !editingPost) return;

    const encryptedContent = encrypt(postContent);

    const { data, error } = await supabase
      .from('posts')
      .update({ post_content: encryptedContent })
      .match({ post_id: editingPost.post_id })
      .select('*');

    if (!error && data) {
      data[0].post_content = postContent;
      setPosts(posts.map(post => (post.post_id === editingPost.post_id ? data[0] : post)));
      setPostContent('');
      setEditingPost(null);
      setIsModalOpen(false);
      setIsAlertOpen(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Feed</h2>
        <IonInput
          placeholder="What's on your mind?"
          value={postContent}
          onIonChange={e => setPostContent(e.detail.value!)}
        />
        <IonButton expand="block" onClick={createPost}>Post</IonButton>

        <IonList>
          {posts.map(post => (
            <IonItem key={post.post_id}>
              <IonAvatar slot="start">
                <img src={post.avatar_url} alt="Avatar" />
              </IonAvatar>
              <IonLabel>
                <h3>{post.username}</h3>
                <p>{post.post_content}</p>
                {user?.id === post.user_id && (
                  <>
                    <IonButton size="small" onClick={() => editPost(post)}>Edit</IonButton>
                    <IonButton size="small" color="danger" onClick={() => deletePost(post.post_id)}>Delete</IonButton>
                  </>
                )}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <IonContent className="ion-padding">
            <h2>Edit Post</h2>
            <IonTextarea value={postContent} onIonChange={e => setPostContent(e.detail.value!)}></IonTextarea>
            <IonButton expand="block" onClick={savePost}>Save</IonButton>
            <IonButton expand="block" color="medium" onClick={() => setIsModalOpen(false)}>Cancel</IonButton>
          </IonContent>
        </IonModal>

        <IonAlert
          isOpen={isAlertOpen}
          onDidDismiss={() => setIsAlertOpen(false)}
          header={'Post Updated'}
          message={'Your post has been successfully updated.'}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default FeedContainer;
