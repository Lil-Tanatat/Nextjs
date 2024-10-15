import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <center>
          <Image
            className={styles.logo}
            src="/logo/giver-logo-noback.png"
            alt="Giverlogo"
            width={400}
            height={400}
            priority
          />
        </center>
        <center>
          <h1 className={styles.comingsoon}>Giver Token Will Coming Soon</h1>
        </center>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://www.facebook.com/profile.php?id=61567122001523"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <Image
              className={styles.logo}
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            /> */}
            Visit Our Facebook {"->"}
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our whitepaper {"->"}
          </a>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
