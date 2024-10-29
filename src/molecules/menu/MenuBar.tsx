import homeLogo from '../../assets/home.png';
import notificationLogo from '../../assets/notification.png';
import { Auth } from '../auth';

export const MenuBar = ({ purpose, country }: { purpose: string | undefined; country: string | undefined }) => {
  return (
    <>
      <div className="flex">
        <div id="languages" className="border-2 outline-0 rounded" style={{ height: 'fit-content' }}>
          <select name="language" id="language">
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>
        {country != undefined && (
          <div className="mx-4">
            <p>
              {purpose == 'business' ? 'Business' : 'Holiday'} in {country}
            </p>
          </div>
        )}

        <div id="menu" className="ms-auto">
          <div className="flex gap-3">
            <img src={homeLogo} className="m-auto" style={{ width: '14px', height: 'fit-content' }} />
            <img src={notificationLogo} className="m-auto" style={{ width: '14px', height: 'fit-content' }} />

            {/* Authentication component */}
            <Auth />
          </div>
        </div>
      </div>
    </>
  );
};
