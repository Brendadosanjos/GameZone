// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "../Styles/CarouselHome.css";
// Import Swiper styles
import { Button } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
export default function CarrouselHome() {
  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
          <div className="carrouselContainer">
            <div className="textContainer">
              <p className="text1">Melhores ofertas personalizadas</p>
              <p className="text2">Queima de Estoque🔥</p>
              <p className="text3">Veja as ofertas que estão em destaque pra hoje</p>
              <Button className="offerButton">Ver ofertas</Button>
            </div>
            <div>
              <img src="games.png" alt="imagem games" width={300} />
              <img src="brilhinho.png" alt="" className="brilhinho"/>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="carrouselContainer">
            <div className="textContainer">
              <p className="text1">Jogos com desconto</p>
              <p className="text2">Xbox</p>
              <p className="text3">Confira as novidades e os jogos mais populares</p>
              <Button className="offerButton">Ver oferta</Button>
            </div>
            <div>
              <img src="xbox.png" alt="imagem xbox" width={280}  />
              <img src="brilhinho.png" alt="" className="brilhinho"/>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
