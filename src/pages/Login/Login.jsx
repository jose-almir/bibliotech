import { useContext, useState } from "react";
import { Button, Container, Form, InputGroup, Nav } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/icons/google-white.svg";
import githubWhiteIcon from "../../assets/icons/githubWhiteIcon.svg";
import loginImg from "../../assets/images/login.png";
import { AuthContext } from "../../contexts/AuthContext";
import { loginGoogle, loginEmailSenha, loginGitHub } from "../../firebase/auth";
import { Footer } from "../../components/Footer/Footer";
import "./Login.css"

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    const { email, senha } = data;
    loginEmailSenha(email, senha)
      .then((user) => {
        toast.success(`Entrando como ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  const [inputType, setInputType] = useState("password");
  const [iconType, setIconType] = useState("bi bi-eye-slash");
  function showPassword() {
    if (inputType === "password") {
      setInputType("text");
      setIconType("bi bi-eye");
    } else {
      setInputType("password");
      setIconType("bi bi-eye-slash");

    }
  }

  function onLoginGoogle() {
    loginGoogle()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  function onLoginGitHub() {
    loginGitHub()
    .then((user) => {
      toast.success(`Bem-vindo(a) ${user.email}`, {
        position: "bottom-right",
        duration: 2500,
      });
      navigate("/");
    })
    .catch((erro) => {
      toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
        position: "bottom-right",
        duration: 2500,
      });
    });
  }

  const usuarioLogado = useContext(AuthContext);

  // Se tiver dados no objeto, está logado
  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid className="my-5">
      <p className="text-center">
        <img src={loginImg} width="256" alt="Logo" />
      </p>
      <h4>Bem-vindo(a) de volta!</h4>
      <p className="text-muted">
        Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
      <hr />
      <div>
      <Button className="mb-2" variant="danger" onClick={onLoginGoogle}>
        <img src={googleIcon} width="32" alt="Google icon" /> Entrar com o
        Google
      </Button>
      <br />
      <Button className="mb-2" variant="dark" onClick={onLoginGitHub}>
        <img src={githubWhiteIcon} width="37" alt="GitHub icon" /> Entrar com o
        GitHub
      </Button>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-5" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Seu email"
            className={errors.email ? "is-invalid" : ""}
            {...register("email", { required: "Email é obrigatório" })}
          />
          <Form.Text className="invalid-feedback">
            {errors.email?.message}
          </Form.Text>
        </Form.Group>
          <Form.Label>Senha</Form.Label>
        <InputGroup className="mb-5" controlId="senha">
          <Form.Control
            onCh
            id="senha"
            type={inputType}
            placeholder="Sua senha"
            className={errors.senha ? "is-invalid" : ""}
            {...register("senha", { required: "Senha é obrigatória" })}
          />
          <InputGroup.Text  onClick={showPassword}><i  className={iconType}></i></InputGroup.Text>
          <Form.Text className="invalid-feedback">
            {errors.senha?.message}
          </Form.Text>
        </InputGroup>
        <p className="text-muted">
        Esqueci minha senha <Link to="/EsqueciMinhaSenha">Acesse</Link>
        </p>
        <Button type="submit" variant="success">
          Entrar
        </Button>
      </Form>
      <Button type="submit" className="mt-3" variant="danger">
        <Nav.Link as={Link} to="/vendas">
        Compre já! <i className="ml-2 bi bi-tags"></i>
        </Nav.Link>
      </Button>
      
      <footer><Footer /></footer>
    </Container>
  );
}
