package com.hart.meliorem.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.profile.request.UpdateProfileSchoolNameRequest;
import com.hart.meliorem.profile.response.GetProfileResponse;
import com.hart.meliorem.profile.response.UpdateProfileSchoolNameResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/profiles")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{profileId}")
    public ResponseEntity<GetProfileResponse> getProfile(@PathVariable("profileId") Long profileId) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetProfileResponse("success", this.profileService.getProfile(profileId)));
    }

    @PatchMapping("/{profileId}/school-name")
    public ResponseEntity<UpdateProfileSchoolNameResponse> updateProfileSchoolName(
            @PathVariable("profileId") Long profileId,
            @Valid @RequestBody UpdateProfileSchoolNameRequest request) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new UpdateProfileSchoolNameResponse("success",
                        this.profileService.updateProfileSchoolName(request.getSchoolName(), profileId)));
    }
}
