import { auth } from '../_lib/auth';
import { getGuest } from '../_lib/data-service';
import SelectCountry from './SelectCountry';
import UpdateProfile from './UpdateProfile';

async function ProfileData() {
  const session = await auth();
  const guest = await getGuest(session.user.email);
  return (
    <UpdateProfile guest={guest}>
      <SelectCountry
        name='nationality'
        id='nationality'
        className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
        defaultCountry={guest?.nationality}
      />
    </UpdateProfile>
  );
}

export default ProfileData;
