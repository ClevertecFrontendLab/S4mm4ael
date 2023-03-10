import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import strokeDown from '../../assets/svg/stroke-down-black.svg';
import strokeUp from '../../assets/svg/stroke-up-black.svg';
import { Comment } from '../../components/comment/comment';
import { NavigationList } from '../../components/navigation-list';
import { SliderBook } from '../../components/slider-book';
import { useGetBookQuery } from '../../redux/features/books-slice';
import { AppDispatch, RootState } from '../../redux/store';
import { defineRoute } from '../../shared/define-ru-category';
import { renderStars } from '../../shared/render-stars';
import { CommentBook } from '../../shared/types.books';

import styles from './book-page.module.css';

export function BookPage() {
  const dispatch: AppDispatch = useDispatch();
  const [isDesktopSize, setDesktopSize] = useState(window.innerWidth > 768);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(true);
  const isBurgerOpen: boolean = useSelector((state: RootState) => state.interface.isBurgerOpen);
  const { bookId } = useParams();
  const { category } = useParams();
  const { data: book, error, isLoading } = useGetBookQuery(`${bookId}`);

  const updateMedia = () => {
    setDesktopSize(window.innerWidth > 768);
  };

  useEffect(() => {
    if (!isLoading && book) {
      dispatch({ type: 'IS_LOADING', payload: false });
    }
    if (isLoading) {
      dispatch({ type: 'IS_LOADING', payload: true });
    }
    if (error) {
      dispatch({ type: 'IS_FETCH_ERROR', payload: true });
      // eslint-disable-next-line no-console
      console.log(error);
    }
  });
  useEffect(() => {
    window.addEventListener('resize', updateMedia);

    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  function renderComments(comments: CommentBook[]) {
    return comments.map((comment) => (
      <Comment
        key={comment.id}
        avatar={comment.user.avatarUrl}
        name={comment.user.firstName + comment.user.lastName}
        rating={comment.rating}
        date={comment.createdAt}
        text={comment.text}
      />
    ));
  }

  return (
    <section className={styles.BookPage}>
      {isBurgerOpen && !error && <NavigationList />}
      <div className={styles.BookPage__route}>
        {isDesktopSize ? (
          <div className={styles.BookPage__routeContainer}>
            <Link data-test-id='breadcrumbs-link' to={`/books/${category}`}>
              <span>{category && defineRoute(category)}</span>
            </Link>{' '}
            /<span data-test-id='book-name'>{book?.title}</span>
          </div>
        ) : (
          <div className={styles.BookPage__route_tablet}>
            <Link data-test-id='breadcrumbs-link' to={`/books/${category}`}>
              <span>{category && defineRoute(category)}</span>
            </Link>{' '}
            / <span data-test-id='book-name'>{book?.title}</span>
          </div>
        )}
      </div>
      {error ? (
        <div> </div>
      ) : (
        <React.Fragment>
          <div className={styles.BookPage__book}>
            {isDesktopSize ? (
              <div className={styles.BookPage__bookWrapper}>
                <div className={styles.BookPage__slider}>
                  {book && <SliderBook isDesktopSize={isDesktopSize} images={book.images} />}
                </div>
                <div className={styles.BookPage__text}>
                  <h1 className={styles.BookPage__title} data-test-id='book-title'>
                    {book?.title}
                  </h1>
                  <div className={styles.BookPage__authors}>
                    <p>{book?.authors.map((author) => `${author}, `)}</p>
                    <span>{book?.issueYear}</span>
                  </div>
                  <button type='button' className={`${styles.BookPage__bookIt}`}>
                    ??????????????????????????
                  </button>
                  <div className={styles.BookPage__about}>
                    <h5>?? ??????????</h5>
                    <article className={styles.BookPage__article}>{book?.description}</article>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.BookPage__bookWrapper}>
                <div className={styles.BookPage__bookWrapper_tablet}>
                  <div className={styles.BookPage__slider}>
                    {book && <SliderBook isDesktopSize={isDesktopSize} images={book.images} />}
                  </div>
                  <div className={styles.BookPage__bookWrapperRight_tablet}>
                    <h1 className={styles.BookPage__title} data-test-id='book-title'>
                      {book?.title}
                    </h1>
                    <div className={styles.BookPage__authors}>
                      <p>{book?.authors.map((author) => `${author}, `)}</p>
                      <span>{book?.issueYear}</span>
                    </div>
                    <button type='button' className={`${styles.BookPage__bookIt}`}>
                      ??????????????????????????
                    </button>
                  </div>
                </div>
                <div className={styles.BookPage__text}>
                  <div className={styles.BookPage__about}>
                    <h5>?? ??????????</h5>
                    <article className={styles.BookPage__article}>{book?.description}</article>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.BookPage__properties}>
            <div className={styles.BookPage__rating}>
              <h5>??????????????</h5>
              {book && (
                <div className={styles.BookPage__ratingStars}>
                  {renderStars(book.rating)} <span>{book.rating}</span>
                </div>
              )}
            </div>
            <div className={styles.BookPage__details}>
              <h5>?????????????????? ????????????????????</h5>
              <div className={styles.BookPage__detailsBook}>
                <div className={styles.BookPage__detailsLeft}>
                  <ul className={styles.BookPage__detailsList}>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>????????????????????????</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.publish}</span>
                    </li>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>?????? ??????????????</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.issueYear}</span>
                    </li>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>??????????????</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.pages}</span>
                    </li>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>????????????????</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.cover}</span>
                    </li>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>????????????</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.format}</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.BookPage__detailsRight}>
                  <ul className={styles.BookPage__detailsList}>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>????????</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.categories.map((el) => `${el}`)}</span>
                    </li>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>??????</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.weight} ??</span>
                    </li>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>ISBN</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.ISBN}</span>
                    </li>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>????????????????????????</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.producer}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.BookPage__comments}>
              <div className={styles.BookPage__commentsHeader}>
                <h5>
                  ????????????{' '}
                  <span className={styles.BookPage__commentsCount}>{book?.comments && book?.comments.length}</span>
                </h5>
                <button
                  data-test-id='button-hide-reviews'
                  onClick={() => (isCommentsOpen ? setIsCommentsOpen(false) : setIsCommentsOpen(true))}
                  type='button'
                  className={styles.BookPage__stroke}
                >
                  <img src={isCommentsOpen ? strokeUp : strokeDown} alt='stroke' />
                </button>
              </div>
              <div className={styles.BookPage__commentSection}>
                <ul className={styles.BookPage__commentList}>
                  {book?.comments ? isCommentsOpen && renderComments(book?.comments) : '???????????????????????? ???????? ??????'}
                </ul>
                <button data-test-id='button-rating' type='button' className={`${styles.BookPage__bookIt}`}>
                  ?????????????? ??????????
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </section>
  );
}
