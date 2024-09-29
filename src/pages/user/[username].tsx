import { GetServerSideProps, NextPage } from 'next';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { User } from '../../types/user';
import UserProfile from '../../components/UserProfile';

interface Props {
  user: User | null;
}

const UserProfilePage: NextPage<Props> = ({ user }) => {
  if (!user) {
    return <div>User not found</div>;
  }

  return <UserProfile user={user} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params as { username: string };
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username));
  const querySnapshot = await getDocs(q);

  let user = null;
  if (!querySnapshot.empty) {
    user = querySnapshot.docs[0].data() as User;
  }

  return { props: { user } };
};

export default UserProfilePage;

// src/components/UserProfile.tsx
import Image from 'next/image';
import { User } from '../types/user';

interface Props {
  user: User;
}

const UserProfile: React.FC<Props> = ({ user }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Image
          src={user.profilePicture || '/default-profile.png'}
          alt={user.name}
          width={100}
          height={100}
          className="rounded-full mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">@{user.username}</p>
        </div>
      </div>
      <p className="mb-4">{user.bio}</p>
    </div>
  );
};

export default UserProfile;