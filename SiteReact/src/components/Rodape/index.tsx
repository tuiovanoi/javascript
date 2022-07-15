import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin} from "react-icons/bs";
import * as S from "./styles";

const Rodape = () => {
    return(
    <S.Rodape>
        <div className="content">
            <a href="https://pt-br.facebook.com/" target="_blank" rel="npreferrer">
                <BsFacebook />
            </a>
            <a href="https://pt-br.instagram.com/" target="_blank" rel="npreferrer">
                <BsInstagram />
            </a>
            <a href="https://pt-br.linkedin.com/" target="_blank" rel="npreferrer">
                <BsLinkedin />
            </a>
        </div>
    </S.Rodape>
    );
};

export default Rodape;