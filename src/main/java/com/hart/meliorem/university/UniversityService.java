package com.hart.meliorem.university;

import org.springframework.stereotype.Service;
import java.util.List;
import java.io.IOException;
import java.util.ArrayList;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.json.*;

@Service
public class UniversityService {

    public List<University> getUniversities(String endpoint, String query) {
        try {
            return getInitial(endpoint + String.join("%20", query.split(" ")));

        } catch (IOException e) {
            e.printStackTrace();
            List<University> list = new ArrayList<>();
            return list;

        }
    }

    private List<University> getInitial(String endpoint) throws IOException {

        HttpURLConnection connection = (HttpURLConnection) URI.create(endpoint).toURL().openConnection();

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
            System.out.println(parseJsonResults(jsonResponseData.toString()));
            return parseJsonResults(jsonResponseData.toString());
        } else {
            List<University> list = new ArrayList<>();
            return list;
        }
    }

    private List<University> parseJsonResults(String jsonResponseData) {
        List<University> universities = new ArrayList<>();
        JSONObject obj = new JSONObject(jsonResponseData);
        JSONArray arr = obj.getJSONArray("results");

        for (int i = 0; i < arr.length(); i++) {
            String displayName = arr
                    .getJSONObject(i)
                    .get("display_name")
                    .toString();
            universities.add(new University(displayName));
        }
        return universities;
    }

}
