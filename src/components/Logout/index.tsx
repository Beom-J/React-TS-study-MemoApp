import { useTranslation } from 'react-i18next';

type Props = {
  userId: string;
  onClickLogOutButton: () => void;
};

const LoginUserInfo = ({ userId, onClickLogOutButton }: Props) => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <span>
        {t('message.welcomeToLogIn')}, {userId}
      </span>
      <button
        className="log-in-btn"
        type="button"
        onClick={onClickLogOutButton}
      >
        {t('button.logOut')}
      </button>
    </div>
  );
};

export default LoginUserInfo;
