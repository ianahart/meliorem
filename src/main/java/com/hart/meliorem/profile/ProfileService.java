package com.hart.meliorem.profile;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.HashMap;

import com.hart.meliorem.advice.ForbiddenException;
import com.hart.meliorem.advice.NotFoundException;
import com.hart.meliorem.amazon.AmazonService;
import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.profile.dto.ProfileDto;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;
import com.hart.meliorem.util.MyUtil;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserService userService;
    private final AmazonService amazonService;

    public ProfileService(ProfileRepository profileRepository,
            UserService userService,
            AmazonService amazonService) {
        this.profileRepository = profileRepository;
        this.userService = userService;
        this.amazonService = amazonService;
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
        Profile profile = checkOwnerShip(profileId);

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

    public Profile checkOwnerShip(Long profileId) {
        if (profileId == null) {
            throw new BadRequestException("Profile Id is missing");
        }
        Profile profile = getProfileById(profileId);
        Long currentUserProfileId = this.userService.getCurrentlyLoggedInUser().getProfile().getId();

        if (profile.getId() != currentUserProfileId) {
            throw new ForbiddenException("Cannot update another user's profile");
        }

        return profile;
    }

    public String updateProfileCourses(String courses, Long profileId) {

        Profile profile = checkOwnerShip(profileId);

        String cleanedCourses = Jsoup.clean(courses, Safelist.none());

        if (cleanedCourses.trim().length() == 0) {
            cleanedCourses = null;
        }
        profile.setCourses(cleanedCourses);

        this.profileRepository.save(profile);

        return cleanedCourses;
    }

    public String updateProfileAvatar(String avatarUrl, Long profileId) {

        if (avatarUrl.length() == 0 || avatarUrl == null) {
            throw new BadRequestException("Missing avatar url");
        }

        Profile profile = checkOwnerShip(profileId);

        profile.setAvatarUrl(avatarUrl);

        this.profileRepository.save(profile);

        return profile.getAvatarUrl();
    }

    public String updateProfilePicture(MultipartFile profilePicture, Long profileId) {
        Profile profile = checkOwnerShip(profileId);

        if (profile.getAvatarFilename() != null) {
            this.amazonService.deleteBucketObject("arrow-date", profile.getAvatarFilename());
            profile.setAvatarFilename(null);
            profile.setAvatarUrl(null);
        }

        HashMap<String, String> result = this.amazonService.putS3Object("arrow-date",
                profilePicture.getOriginalFilename(),
                profilePicture);

        profile.setAvatarFilename(result.get("filename"));
        profile.setAvatarUrl(result.get("objectUrl"));

        this.profileRepository.save(profile);

        return profile.getAvatarUrl();

    }
}
