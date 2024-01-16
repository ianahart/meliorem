package com.hart.meliorem.university;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.university.response.GetUniversityResponse;

@RestController
@RequestMapping(path = "/api/v1/universities")
public class UniversityController {

    private final UniversityService universityService;

    @Autowired
    public UniversityController(UniversityService universityService) {
        this.universityService = universityService;

    }

    @GetMapping("")
    public ResponseEntity<GetUniversityResponse> getUniversities(@RequestParam("query") String query) {

        System.out.println("============================");
        System.out.println(query);
        System.out.println("============================");
        return ResponseEntity.status(HttpStatus.OK).body(new GetUniversityResponse("success", this.universityService
                .getUniversities("https://api.openalex.org/institutions?per-page=5&search=", query)));
    }
}
