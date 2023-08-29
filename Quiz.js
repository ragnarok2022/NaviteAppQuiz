import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const afirmacoes = [
  { texto: 'React Native é uma linguagem de programação.', resposta: false },
  { texto: 'Expo é uma ferramenta para desenvolvimento mobile.', resposta: true },
  { texto: 'O Sol gira em torno da Terra.', resposta: false },
  { texto: '2 + 2 é igual a 5.', resposta: false },
];

export default function App() {
  const [pontuacao, setPontuacao] = useState(0);
  const [indiceAfirmacaoAtual, setIndiceAfirmacaoAtual] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [quizIniciado, setQuizIniciado] = useState(false);

  const iniciarQuiz = () => {
    setPontuacao(0);
    setIndiceAfirmacaoAtual(0);
    setMostrarResultado(false);
    setQuizIniciado(true);
  };

  const responderAfirmacao = (resposta) => {
    const afirmacaoAtual = afirmacoes[indiceAfirmacaoAtual];

    if (afirmacaoAtual && afirmacaoAtual.resposta === resposta) {
      setPontuacao((pontuacaoAnterior) => pontuacaoAnterior + 1);
    }

    setMostrarResultado(true);
  };

  const proximaAfirmacao = () => {
    setMostrarResultado(false);
    setIndiceAfirmacaoAtual((índiceAnterior) => índiceAnterior + 1);
  };

  const finalizarQuiz = () => {
    setMostrarResultado(true);
  };

  const reiniciarQuiz = () => {
    setPontuacao(0);
    setIndiceAfirmacaoAtual(0);
    setMostrarResultado(false);
    setQuizIniciado(false);
  };

  if (!quizIniciado) {
    return (
      <View style={styles.container}>
        <Text style={styles.introText}>Bem-vindo ao QuizApp!</Text>
        <TouchableOpacity style={styles.button} onPress={iniciarQuiz}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (indiceAfirmacaoAtual === afirmacoes.length - 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.textoResultado}>
          Parabéns, você acertou {pontuacao} afirmacoes!
        </Text>
        <TouchableOpacity style={styles.button} onPress={reiniciarQuiz}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const afirmacaoAtual = afirmacoes[indiceAfirmacaoAtual];

  return (
    <View style={styles.container}>
      <Text style={styles.textoAfirmacao}>{afirmacaoAtual.texto}</Text>
      {mostrarResultado && (
        <View>
          <Text style={styles.textoResultado}>
            {afirmacaoAtual.resposta ? 'Acertou!' : 'Errou!'}
          </Text>
          {indiceAfirmacaoAtual === afirmacoes.length - 1 ? (
            <TouchableOpacity style={styles.button} onPress={finalizarQuiz}>
              <Text style={styles.buttonText}>Finalizar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={proximaAfirmacao}>
              <Text style={styles.buttonText}>
                {indiceAfirmacaoAtual === afirmacoes.length - 2 ? 'Finalizar' : 'Próxima afirmação'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {!mostrarResultado && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.botaoVerdadeiro]}
            onPress={() => responderAfirmacao(true)}
          >
            <Text style={styles.buttonText}>Verdadeiro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.botaoFalso]}
            onPress={() => responderAfirmacao(false)}
          >
            <Text style={styles.buttonText}>Falso</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textoAfirmacao: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  botaoVerdadeiro: {
    backgroundColor: 'green',
  },
  botaoFalso: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  textoResultado: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  introText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});
