import "./MoviesCardList.css";

const MoviesCardList = ({ children }) => {
  return (
    <>
      <section className="movies">
        {children}
      </section>
    </>

  )
}

export default MoviesCardList;
