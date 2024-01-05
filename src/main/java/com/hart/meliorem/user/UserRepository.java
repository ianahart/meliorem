package com.hart.meliorem.user;

import java.util.Optional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Modifying
    @Query(value = """
            update User u set u.loggedIn = :loggedIn WHERE u.id = :userId
            """)
    void updateLoggedIn(@Param("userId") Long userId, @Param("loggedIn") Boolean loggedIn);
}
