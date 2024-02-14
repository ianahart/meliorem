package com.hart.meliorem.group;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

    @Query(value = """
               SELECT EXISTS(SELECT 1 FROM
                Group g
                INNER JOIN g.admin a
                WHERE a.id = :userId
                AND g.name = :name
                )
            """)
    boolean groupExistsByUserIdAndName(@Param("userId") Long userId, @Param("name") String name);
}
