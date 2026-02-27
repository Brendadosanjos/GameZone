import "../Styles/Footer.css";

export default function Footer() {
  return (
    <>
      <div id="footer" className="containerFooterInformations">
        <div className="footerContainer">
          <div className="logoLorem">
            <div className="footerLogo">
              <img src="logo.png" alt="logo-navBar" />
              <h1> GameZone</h1>
            </div>
            <div className="footer-text">
              <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint repellat magni corrupti ducimus minima perferendis voluptatibus laudantium.
              </p>
            </div>
            <div className="footer-icons">
              <button><i className="fa-brands fa-instagram"></i></button>
              <button><i className="fa-brands fa-x-twitter"></i></button>
             <button><i className="fa-brands fa-facebook"></i></button>
            </div>
          </div>
          <div className="categories">
            <p>Categorias</p>
            <div className="categoriesLinks">
              <a href="#">Nintendo</a>
              <a href="#">Playstation</a>
              <a href="#">Xbox</a>
              <a href="#">PC</a>
            </div>
          </div>
          <div className="contact">
            <p>Contatos</p>
            <div className="contactLinks">
              <a href="">Rua  dos esquecidos, Cheiro do Queijo 171</a>
              <p  id="contatctP">(88)0000-00000</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footerCopy">
        <div>
          <hr id="hr" />
        </div>
        <div className="footerCopyRight">
          <p> @ UNIFOR 2026</p>
        </div>
      </div>
    </>
  );
}
