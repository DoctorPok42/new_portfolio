import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';

import styles from './style.module.scss';

interface CVButtonProps {
  pathToResume: string;
}

const CVButton = ({
  pathToResume,
}: CVButtonProps) => {
  return (
    <div
      className={styles.CVButton_container}
      onClick={() => window.open(pathToResume, '_blank')}
    >
      <h2>CV</h2>

      <FontAwesomeIcon
        id='buttonImg'
        icon={faFileInvoice}
      />
    </div>
  );
};

export default CVButton;
