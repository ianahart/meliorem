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

import com.hart.meliorem.profile.request.UpdateProfileAvatarRequest;
import com.hart.meliorem.profile.request.UpdateProfileCourseRequest;
import com.hart.meliorem.profile.request.UpdateProfileSchoolNameRequest;
import com.hart.meliorem.profile.response.GetProfileResponse;
import com.hart.meliorem.profile.response.UpdateProfileAvatarResponse;
import com.hart.meliorem.profile.response.UpdateProfileCourseResponse;
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

    @PatchMapping("/{profileId}/courses")
    public ResponseEntity<UpdateProfileCourseResponse> updateProfileCourses(@PathVariable("profileId") Long profileId,
            @Valid @RequestBody UpdateProfileCourseRequest request) {

        return ResponseEntity.status(HttpStatus.OK).body(new UpdateProfileCourseResponse("success",
                this.profileService.updateProfileCourses(request.getCourses(), profileId)));
    }

    @PatchMapping("/{profileId}/avatar")
    public ResponseEntity<UpdateProfileAvatarResponse> updateProfileAvatar(@PathVariable("profileId") Long profileId,
            @RequestBody UpdateProfileAvatarRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(new UpdateProfileAvatarResponse("success", this.profileService.updateProfileAvatar(request.getAvatarUrl(), profileId)));
    }

}
