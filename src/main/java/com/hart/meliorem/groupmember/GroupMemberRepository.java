package com.hart.meliorem.groupmember;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    @Query(value = """
              SELECT m.id FROM GroupMember gm
                INNER JOIN gm.group g
                INNER JOIN gm.member m
                WHERE g.id = :groupId
            """)
    List<Long> getGroupMembersByGroupId(@Param("groupId") Long groupId);
}
