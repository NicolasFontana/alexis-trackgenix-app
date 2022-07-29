import styles from './landing.module.css';
import { faClock, faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faUsersCog, faSitemap, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ScrollToTop } from 'Components/Shared';

const clockIcon = <FontAwesomeIcon icon={faClock} className={styles.icons} />;
const fileIcon = <FontAwesomeIcon icon={faFileAlt} className={styles.icons} />;
const resourceIcon = <FontAwesomeIcon icon={faSitemap} className={styles.icons} />;
const teamIcon = <FontAwesomeIcon icon={faUsersCog} className={styles.icons} />;
const checkIcon = <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />;

function Home() {
  return (
    <section className={styles.container}>
      <section className={styles.info}>
        <div>
          <h2 className={styles.title}>What is Trackgenix?</h2>
          <p>
            Trackgenix is a web system to ease the registration of the hours worked by each employee
            in each project and work team. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Possimus maxime iure delectus! Ad itaque dolorum culpa maiores! Unde nihil blanditiis
            consequuntur reiciendis, molestiae laudantium mollitia beatae quidem nostrum, soluta
            labore.
          </p>
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
                Track work just as you are used to, but simpler. Your employees can write down when
                and what they worked on at any time so you all can be updated at all times.
              </p>
            </div>
          </div>
          <div className={styles.containerItem}>
            <div className={styles.containerIcon}>{resourceIcon}</div>
            <div>
              <h3 className={styles.subtitle}>Resource management</h3>
              <p>
                Trackgenix web system guarantees you a better management of the resources you have.
                It increases considerably the productivity as it allows you to get more work done in
                less time.
              </p>
            </div>
          </div>
          <div className={styles.containerItem}>
            <div className={styles.containerIcon}>{fileIcon}</div>
            <div>
              <h3 className={styles.subtitle}>Reports</h3>
              <p>
                Trackgenix guarantees you a reliable data source to be based on when you have to
                make decisions whether simple or complex.
              </p>
            </div>
          </div>
          <div className={styles.containerItem}>
            <div className={styles.containerIcon}>{teamIcon}</div>
            <div>
              <h3 className={styles.subtitle}>Multiple Roles</h3>
              <p>
                we are commited to flexible work and to building tools that fit into any workflow.
                In order to improve your company leadership and team management, we offer you this
                tool which can be easily adapted to your employees necessities.
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
            In Trackgenix SA we are a group of software developers that offer our services to other
            companies since 2020. Our main goal as a team is to give you an appropriate tool
            according to your needs. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Voluptas officiis incidunt non amet accusantium minima expedita veniam quas aliquid
            dignissimos eum similique suscipit, ad minus.
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
      <ScrollToTop />
    </section>
  );
}

export default Home;
