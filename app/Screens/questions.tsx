import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
import api from "../utils/api";
export default function QuizCard() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple&encode=url3986"
        );
        const data = await response.json();
        setQuestions(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const current = questions[currentIndex];
      const allOptions = shuffleOptions([
        ...current.incorrect_answers,
        current.correct_answer,
      ]);
      setOptions(allOptions);
      setSelectedOption(userAnswers[currentIndex] || null);
    }
  }, [questions, currentIndex]);

  const shuffleOptions = (options: string[]) => {
    return options
      .map((item) => decodeURIComponent(item))
      .sort(() => Math.random() - 0.5);
  };

  const handleOptionSelect = (option: string) => {
    if (selectedOption) return;

    const correct = decodeURIComponent(questions[currentIndex].correct_answer);
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = option;
    setUserAnswers(updatedAnswers);

    if (option === correct) {
      setScore((prev) => prev + 1);
    }
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
    setUserAnswers([]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4E6C50" />
        <Text>Loading questions...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No questions available</Text>
      </View>
    );
  }

  if (showResults) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.headerText1}>Results</Text>
          <Text style={styles.scoreText}>
            You scored {score} out of {questions.length}
          </Text>
          {questions.map((q, index) => {
            const correct = decodeURIComponent(q.correct_answer);
            const selected = userAnswers[index];
            return (
              <View key={index} style={{ marginTop: 15 }}>
                <Text style={{ fontWeight: "bold" }}>
                  {index + 1}. {decodeURIComponent(q.question)}
                </Text>
                <Text
                  style={{
                    color: selected === correct ? "green" : "red",
                    marginTop: 4,
                  }}
                >
                  Your answer: {selected || "Not Answered"}
                </Text>
                {selected !== correct && (
                  <Text style={{ color: "green" }}>
                    Correct answer: {correct}
                  </Text>
                )}
              </View>
            );
          })}
          <TouchableOpacity style={styles.nextButton} onPress={resetQuiz}>
            <Text style={styles.nextButtonText}>Retry Quiz</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  const router = useRouter();
  const currentQuestion = questions[currentIndex];
  const correctAnswer = decodeURIComponent(currentQuestion.correct_answer);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Quiz Application</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.questionText}>
          {currentIndex + 1}. {decodeURIComponent(currentQuestion.question)}
        </Text>

        {options.map((option, index) => {
          const isCorrect = option === correctAnswer;
          const isSelected = selectedOption === option;
          const optionStyle =
            selectedOption === null
              ? styles.optionButton
              : isSelected
              ? isCorrect
                ? styles.correctOption
                : styles.wrongOption
              : isCorrect
              ? styles.correctOption
              : styles.optionButton;

          return (
            <TouchableOpacity
              key={index}
              style={optionStyle}
              onPress={() => handleOptionSelect(option)}
              disabled={selectedOption !== null}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          );
        })}

        <View style={styles.navigation}>
          <TouchableOpacity
            style={[styles.navButton, currentIndex === 0 && { opacity: 0.5 }]}
            onPress={handlePrevious}
            disabled={currentIndex === 0}
          >
            <Text style={styles.navText}>Previous</Text>
          </TouchableOpacity>

          {selectedOption && (
            <TouchableOpacity style={styles.navButton} onPress={handleNext}>
              <Text style={styles.navText}>
                {currentIndex === questions.length - 1 ? "Submit" : "Next"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF2E0",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#7965C1",
    paddingVertical: 20,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  headerText: {
    fontSize: 24,
    color: "#FFF2E0",
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 12,
    width: "100%",
    marginTop: 120,
    elevation: 4,
    margin: 20,
  },
  questionText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#EEE",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  correctOption: {
    backgroundColor: "#B6E2A1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  wrongOption: {
    backgroundColor: "#F7A4A4",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navButton: {
    backgroundColor: "#4E6C50",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  navText: {
    color: "#FFF2E0",
    fontSize: 16,
    fontWeight: "bold",
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  nextButton: {
    backgroundColor: "#4E6C50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  nextButtonText: {
    color: "#FFF2E0",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText1: {
    textAlign: "center",
    color: "#7965C1",
    fontSize: 20,
    fontWeight: "900",
  },
});
