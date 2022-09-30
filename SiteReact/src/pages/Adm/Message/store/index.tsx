import { FormEvent, useEffect, useState } from "react";
import * as S from "./styles";
import { LoadingComponent, ButtonComponent } from "components";
import { FcDatabase, FcUndo } from "react-icons/fc";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiMessage } from "services/data";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IMessageData } from "interfaces/message.interface";
import { IErrorResponse } from "interfaces/user.interface";

const MessageStore = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IMessageData>({
    title: '',
    message: '',
  })
  const { id } = useParams<{ id: string }>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      console.log(Number(id))
      if (Number(id) > 0) {
        await apiMessage.update(Number(id), formData);
        toast.success("Mensagem alterada com sucesso!");
      } else {
        await apiMessage.store(formData);
        toast.success("Mensagem cadastrada com sucesso!");
      }
      navigate('/adm/message')
    } catch (error) {
      const err = error as AxiosError<IErrorResponse>
      let messages = err.response?.data.message
      if (err.response?.data.errors) {
        messages = err.response?.data.errors?.map((i) => i.message)
          .reduce((total, cur) => `${total} ${cur}`)
      }
      toast.error(messages)
    }
  }

  async function handleChange(e: IMessageData) {
    setFormData((state: IMessageData | undefined) => ({ ...state, ...e }))
  }

  useEffect(() => {
    if (Number(id) > 0) {
      const fetchData = async (id: number) => {
        try {
          const response = await apiMessage.show(id);
          setFormData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData(Number(id));
    }
    setIsLoading(false);
  }, [id]);

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <S.Main>
            <form method="POST" onSubmit={handleSubmit}>
              <Link to="/adm/message">
                <FcUndo /> Voltar
              </Link>
              <div>
                <label htmlFor="title">Título: </label>
                <input type="text" id="title" placeholder="Escreva um título" required
                  onChange={(e) => handleChange({ title: e.target.value })}
                  value={formData?.title}
                />
              </div>
              <div>
                <label htmlFor="message">Mensagem: </label>
                <textarea id="message" placeholder="Escreva uma mensagem" required
                  onChange={(e) => handleChange({ message: e.target.value })}
                  value={formData?.message}
                />
              </div>
              <ButtonComponent bgColor="add" type="submit">
                Enviar <FcDatabase />
              </ButtonComponent>
            </form>
          </S.Main>
        </>
      )}
    </>
  );
};

export default MessageStore;