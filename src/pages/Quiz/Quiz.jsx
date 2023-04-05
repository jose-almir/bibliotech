import { perguntasLiteratura } from "../../data/quiz";
import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";


import "bootstrap/dist/css/bootstrap.min.css";
import "./Quiz.css";

export function Quiz() {
  const [respostaAtual, setRespostaAtual] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [pontosFinais, setPontosFinais] = useState(0)
  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;

  function checarQuestao(isCorrect) {
    if (isCorrect) {
      setScore(score + 1);
      setPontosFinais(pontosFinais + 10)
    }
    modificarQuestão()
  }

  function modificarQuestão() {
    const questaoSeguinte = respostaAtual + 1;
    if (questaoSeguinte < perguntasLiteratura.length) {
      setRespostaAtual(questaoSeguinte);
    } else {
      setShowScore(true);
    }
  }

  return (


    <Container>

      {showScore ? (

        <div className={`${temaEscuro ? "bg-dark text-light" : "bg-light text-dark"} quiz`}>

          <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="score-section p-5 text-center">
              <h3 className="mb-4">Sua pontuação:</h3>
              <h1 className="display-1">{pontosFinais}/100</h1>
              <p className="mt-4">
                Você acertou {score} de {perguntasLiteratura.length} questões
              </p>
            </div>
          </Container> </div>

      ) : (
        <>

          <div className={`${temaEscuro ? "bg-dark text-light" : "bg-light text-dark"} emprestimos`}>
            <Container className="d-flex justify-content-center align-items-center vh-100">
              <div className="question-section p-5 text-center">
                <div className="question-count mb-4">
                  <h1>Quiz</h1>
                  <span>
                    Questão {respostaAtual + 1} / {perguntasLiteratura.length}
                  </span>
                </div>
                <div className="question-text mb-4">
                  {perguntasLiteratura[respostaAtual].questionText}
                </div>
                <div className="answer-section">
                  {perguntasLiteratura[respostaAtual].answerOptions.map(
                    (answerOption, index) => (
                      <Button
                        key={index}
                        variant="outline-success"
                        className="m-2"
                        onClick={() => checarQuestao(answerOption.isCorrect)}
                      >
                        {answerOption.answerText}
                      </Button>
                    )
                  )}
                </div>
              </div>
            </Container> </div>
        </>
      )}



    </Container>
  );
}
