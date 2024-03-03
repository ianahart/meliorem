package com.hart.meliorem.quiz;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.util.List;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hart.meliorem.quiz.dto.GetQuizDto;
import com.hart.meliorem.quiz.dto.QuizResultDto;
import com.hart.meliorem.user.UserService;

@Service
class QuizService {

    private final UserService userService;

    @Autowired
    public QuizService(UserService userService) {
        this.userService = userService;
    }

    public GetQuizDto getQuiz(String quizAPIUrl, String topicName) throws IOException {

        HttpURLConnection connection = (HttpURLConnection) URI.create(quizAPIUrl).toURL().openConnection();

        connection.setRequestMethod("GET");

        int responseCode = connection.getResponseCode();

        if (responseCode == HttpURLConnection.HTTP_OK) {
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuffer jsonResponseData = new StringBuffer();
            String readLine = null;
            while ((readLine = in.readLine()) != null) {
                jsonResponseData.append(readLine);
            }

            in.close();
            return new GetQuizDto(parseJsonQuizResults(jsonResponseData.toString()), topicName);
        } else {
            List<QuizResultDto> list = new ArrayList<>();
            return new GetQuizDto(list, topicName);
        }
    }

    private List<QuizResultDto> parseJsonQuizResults(String jsonQuizResults) {
        List<QuizResultDto> quizResults = new ArrayList<>();
        JSONObject obj = new JSONObject(jsonQuizResults);
        JSONArray arr = obj.getJSONArray("results");

        for (int i = 0; i < arr.length(); i++) {
            JSONObject question = arr.getJSONObject(i);
            List<Object> incorrectAnswers = arr.getJSONObject(i).getJSONArray("incorrect_answers").toList();
            quizResults.add(new QuizResultDto(
                    question.get("type").toString(),
                    question.get("difficulty").toString(),
                    question.get("category").toString(),
                    question.get("question").toString(),
                    question.get("correct_answer").toString(),
                    incorrectAnswers));
        }

        return quizResults;
    }

}
