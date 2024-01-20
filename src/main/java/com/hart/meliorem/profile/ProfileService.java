package com.hart.meliorem.profile;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;
import java.util.Arrays;

import com.hart.meliorem.advice.ForbiddenException;
import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.profile.dto.ProfileDto;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;
import com.hart.meliorem.util.MyUtil;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserService userService;

    public ProfileService(ProfileRepository profileRepository, UserService userService) {
        this.profileRepository = profileRepository;
        this.userService = userService;
    }

    public Profile getProfileById(Long profileId) {

        return this.profileRepository.findById(profileId)
                .orElseThrow(() -> new NotFoundException("A profile with the id " + profileId + " was not found"));
    }

    public ProfileDto getProfile(Long profileId) {
        User user = this.userService.getCurrentlyLoggedInUser();

        if (user.getProfile().getId() != profileId) {
            throw new ForbiddenException("Cannot retrieve another user's profile information");
        }

        return this.profileRepository.getProfileById(profileId);
    }

    public Profile createProfile() {
        Profile profile = new Profile();

        this.profileRepository.save(profile);

        return profile;
    }

    public String updateProfileSchoolName(String schoolName, Long profileId) {
        if (profileId == null) {
            throw new BadRequestException("Profile Id is missing");
        }
        Profile profile = getProfileById(profileId);
        Long currentUserProfileId = this.userService.getCurrentlyLoggedInUser().getProfile().getId();

        if (profile.getId() != currentUserProfileId) {
            throw new ForbiddenException("Cannot update another user's profile");
        }

        if (schoolName.trim().length() == 0) {
            profile.setSchoolName("");
        } else {

            schoolName = Jsoup.clean(schoolName, Safelist.none());

            String capitalizedSchoolName = String.join(" ", Arrays
                    .stream(schoolName.split(" ")).map(word -> MyUtil.capitalize(word))
                    .toList());

            profile.setSchoolName(capitalizedSchoolName);

        }

        this.profileRepository.save(profile);

        return profile.getSchoolName();
    }

}
