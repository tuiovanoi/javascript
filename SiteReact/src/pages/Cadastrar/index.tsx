import React from "react";
import { Link } from "react-router-dom";
import { FaKey } from "react-icons/fa"
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import * as S from "./styles";
import { ButtonComponent } from "components";

const Cadastrar = () => {
    return (
        <S.Section>
            <h1>Cadastrade-se</h1>
            <form action="cadastrar.html" method="post">
                <label htmlFor="nome">Nome</label>
                <div>
                    <BsFillPersonFill />
                    <input type="text" name="nome" id="id" placeholder="Nome" />
                </div>
                <label htmlFor="email">Email</label>
                <div>
                    <MdEmail />
                    <input type="email" name="email" id="id" placeholder="E-mail" />
                </div>
                <label htmlFor="senha">Senha</label>
                <div>
                    <FaKey />
                    <input type="password" name="email" id="senha" placeholder="Senha" />
                </div>
                <p>
                    Já possui conta? <Link to="/login">Faça o login</Link>
                    <ButtonComponent>Salvar</ButtonComponent>
                </p>
            </form>
        </S.Section>
    );
};

export default Cadastrar;