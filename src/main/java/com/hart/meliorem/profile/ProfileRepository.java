package com.hart.meliorem.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hart.meliorem.profile.dto.ProfileDto;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    @Query(value = """
             SELECT new com.hart.meliorem.profile.dto.ProfileDto(
              p.id AS id, p.createdAt, p.updatedAt, p.avatarUrl, p.schoolName,
              p.courses
             ) FROM Profile p
             WHERE p.id = :profileId
            """)
    ProfileDto getProfileById(@Param("profileId") Long profileId);

}
