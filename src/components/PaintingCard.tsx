import styles from "../App.module.scss";

interface PaintingCardProps {
  image: string;
  title: string;
  year: string;
  author: string;
  location: string;
}

const PaintingCard = ({
  image,
  title,
  year,
  author,
  location,
}: PaintingCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.info}>
        <div className={styles.line} />
        <div className={styles.text}>
          <h1 className={styles.h1}>{title.toUpperCase()}</h1>
          <h2 className={styles.h2}>{year}</h2>
        </div>
        <div className={styles.hoverInfo}>
          <div className={styles.line} />
          <div className={styles.textHover}>
            <h1 className={styles.h1}>{author}</h1>
            <h2 className={styles.h2}>{location}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaintingCard;
