import { ButtonText } from 'Components/Shared';
import styles from './landing.module.css';
import { faClock, faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faUsersCog, faSitemap, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollToTop from 'Components/Shared/ScrollToTop';

const clockIcon = <FontAwesomeIcon icon={faClock} className={styles.icons} />;
const fileIcon = <FontAwesomeIcon icon={faFileAlt} className={styles.icons} />;
const resourceIcon = <FontAwesomeIcon icon={faSitemap} className={styles.icons} />;
const teamIcon = <FontAwesomeIcon icon={faUsersCog} className={styles.icons} />;
const checkIcon = <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />;

function Home() {
  return (
    <section className={styles.container}>
      <ScrollToTop />
      <section className={styles.info}>
        <div>
          <h2 className={styles.title}>What is Trackgenix?</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam quam quisquam esse,
            ducimus molestias, quae cupiditate obcaecati sed, nisi animi eius asperiores quas quidem
            ad distinctio atque velit impedit cum. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Deserunt tempore delectus fugiat est fuga harum nisi quasi rem, veniam
            quas doloribus optio non officiis consectetur odit totam praesentium illum autem nulla
            maxime unde velit esse. Eius consectetur inventore temporibus id.
          </p>
          <ButtonText label={'Learn More'} />
        </div>
        <img
          className={styles.img1}
          alt="Laptop"
          src={`${process.env.PUBLIC_URL}/assets/images/first.jpg`}
        />
      </section>
      <section className={styles.functionalities}>
        <h2 className={styles.title}>Functionalities</h2>
        <div className={styles.items}>
          <div className={styles.containerItem}>
            <div className={styles.containerIcon}>{clockIcon}</div>
            <div>
              <h3 className={styles.subtitle}>Hours log</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eligendi
                consequatur inventore asperiores illo atque at.
              </p>
            </div>
          </div>
          <div className={styles.containerItem}>
            <div className={styles.containerIcon}>{resourceIcon}</div>
            <div>
              <h3 className={styles.subtitle}>Resource management</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eligendi
                consequatur inventore asperiores illo atque at.
              </p>
            </div>
          </div>
          <div className={styles.containerItem}>
            <div className={styles.containerIcon}>{fileIcon}</div>
            <div>
              <h3 className={styles.subtitle}>Reports</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eligendi
                consequatur inventore asperiores illo atque at.
              </p>
            </div>
          </div>
          <div className={styles.containerItem}>
            <div className={styles.containerIcon}>{teamIcon}</div>
            <div>
              <h3 className={styles.subtitle}>Multiple Roles</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eligendi
                consequatur inventore asperiores illo atque at.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.list}>
        <div>
          <h2 className={styles.title}>Why Trackgenix?</h2>
          <ul>
            <li>{checkIcon} Productivity booster</li>
            <li>{checkIcon} Work traceability</li>
            <li>{checkIcon} Leadership and team management</li>
            <li>{checkIcon} Decision making</li>
          </ul>
          <ButtonText label={'Learn More'} />
        </div>
        <img
          className={styles.img2}
          alt="Workers"
          src={`${process.env.PUBLIC_URL}/assets/images/second.jpg`}
        />
      </section>
      <section className={styles.history}>
        <div>
          <h2 className={styles.title}>Our History</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, consequuntur, beatae
            labore dolores a asperiores quo recusandae deserunt animi in iure non voluptatibus nulla
            accusamus dignissimos magnam, aperiam eius nobis! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Explicabo nam excepturi voluptas voluptatibus fuga tempore, sit
            numquam veritatis sed. Accusantium tempora iure eaque cupiditate reiciendis eum nam ipsa
            eveniet magnam?
          </p>
        </div>
        <img
          className={styles.img3}
          alt="Building"
          src={`${process.env.PUBLIC_URL}/assets/images/third.jpg`}
        />
      </section>
      <section className={styles.lists}>
        <div>
          <h2 className={styles.title}>Company</h2>
          <ol>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Clients</a>
            </li>
            <li>
              <a href="#">Resources</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ol>
        </div>
        <div>
          <h2 className={styles.title}>Support</h2>
          <ol>
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">Tutorials</a>
            </li>
            <li>
              <a href="#">API</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ol>
        </div>
      </section>
    </section>
  );
}

export default Home;
