import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import empty from '../../assets/img/book-cover-none.jpg';
import emptyList from '../../assets/img/book-cover-none-list.jpg';
import { RootState } from '../../redux/reducers/root-reducer';
import { renderStars } from '../../shared/render-stars';
import { BookCard } from '../../shared/types.books';

import { Highlight } from './highlight';

import styles from './card.module.css';

export function Card(props: BookCard) {
  const { id, image, authors, title, issueYear, rating, booking, categories } = props.bookItem;
  const category = categories[0];
  const location = useLocation()
  const searchQuery: string = useSelector((state: RootState) => state.data.searchQuery);

  function Truncate(string: string, amount: number) {
    return string.length > amount ? `${string.substring(0, amount - 3)}...` : string;
  }

  function definePath(genre: string) {
    let path = '';

    switch (genre) {
      case 'Бизнес':
        path = 'business';
        break;
      case 'Психология':
        path = 'psychology';
        break;
      case 'Родителям':
        path = 'parents';
        break;
      case 'Нон-фикшн':
        path = 'non-fiction';
        break;
      case 'Художественная литература':
        path = 'fiction';
        break;
      case 'Программирование':
        path = 'programming';
        break;
      case 'Хобби':
        path = 'hobby';
        break;
      case 'Дизайн':
        path = 'design';
        break;
      case 'Детские':
        path = 'childish';
        break;
      case 'Другое':
        path = 'other';
        break;

      default:
        path = 'all';
        break;
    }

    return path;
  }
  function defineLink() {

    if (location.pathname.split('/')[3] === 'all') {
      return 'all';
    }

    return definePath(category);
  }
  if (props.isListView) {
    return (
      <Link to={`/books/${defineLink()}/${id}`}>
        {' '}
        <div id={id} className={`${styles.Card} ${styles.Card_list}`} data-test-id='card'>
          {image && <img src={`https://strapi.cleverland.by${image.url}`} alt='book-cover' width='120px' />}
          {!image && <img src={emptyList} alt='book-cover' height='170px' />}
          <div className={`${styles.Card__wrapper} ${styles.Card__wrapperList}`}>
            <div className={`${styles.Card__content} ${styles.Card__content_list}`}>
              <h5 className={`${styles.Card__title} ${styles.Card__title_list}`}>
                <Highlighter
                  highlightClassName={styles.Card__titleHighlighter}
                  searchWords={[searchQuery]}
                  autoEscape={true}
                  textToHighlight={Truncate(title, 85)}
                  higlightTag={Highlight}
                />
              </h5>
              <p className={`${styles.Card__authors_list} ${styles.Card__authors}`}>
                {authors.map((author) => `${author}`)}
                <span className={styles.Card__year}>, {issueYear}</span>
              </p>
              <div className={`${styles.Card__wrapper} ${styles.Card__wrapper_list} ${styles.Card__wrapper_rating}`}>
                <div className={`${styles.Card__rating} ${styles.Card__rating_list}`}>
                  {rating ? renderStars(rating) : 'ещё нет оценок'}
                </div>
                {!booking && (
                  <button type='button' className={`${styles.Card__bookIt} ${styles.Card__bookIt_list}`}>
                    Забронировать
                  </button>
                )}
                {booking?.order && !booking.dateOrder && (
                  <button type='button' className={`${styles.Card__bookIt} ${styles.Card__bookIt_bookedList}`}>
                    Забронирована
                  </button>
                )}
                {booking && booking.dateOrder && (
                  <button type='button' className={`${styles.Card__bookIt} ${styles.Card__bookIt_unavailable}`}>
                    Занята до {booking.dateOrder.slice(8, 10)}.{booking.dateOrder.slice(5, 7)}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/books/:${defineLink()}/${id}`}>
      {' '}
      <div id={id} className={styles.Card} data-test-id='card'>
        <div className={styles.Card__image}>
          {image && <img src={`https://strapi.cleverland.by${image.url}`} alt='book-cover' height='174px' />}
          {!image && <img src={empty} alt='book-cover' />}
        </div>
        <div className={styles.Card__rating}>{rating ? renderStars(rating) : 'ещё нет оценок'}</div>
        <div className={styles.Card__content}>
          <h5 className={styles.Card__title}>
            <Highlighter
              highlightClassName={styles.Card__titleHighlighter}
              searchWords={[searchQuery]}
              autoEscape={true}
              textToHighlight={Truncate(title, 42)}
              highlightTag={Highlight}
            />
          </h5>
          <p className={styles.Card__authors}>
            {authors.map((author) => `${author}`)}, <span className={styles.Card__year}>{issueYear}</span>
          </p>
        </div>
        {!booking && (
          <button type='button' className={styles.Card__bookIt}>
            Забронировать
          </button>
        )}
        {booking?.order && !booking.dateOrder && (
          <button type='button' className={`${styles.Card__bookIt} ${styles.Card__bookIt_booked}`}>
            Забронирована
          </button>
        )}
        {booking && booking.dateOrder && (
          <button type='button' className={`${styles.Card__bookIt} ${styles.Card__bookIt_unavailable}`}>
            Занята до {booking.dateOrder.slice(8, 10)}.{booking.dateOrder.slice(5, 7)}
          </button>
        )}
      </div>
    </Link>
  );
}
