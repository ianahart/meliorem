package com.hart.meliorem.topic;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hart.meliorem.topic.dto.TopicDto;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

    @Query(value = """
            SELECT new com.hart.meliorem.topic.dto.TopicDto(
             t.id AS id, t.name AS name
            ) FROM Topic t
            INNER JOIN t.user u
            WHERE u.id = :userId
            """)
    List<TopicDto> getTopicsByUserId(@Param("userId") Long userId);

    @Query(value = """
            SELECT t.id FROM Topic t
            INNER JOIN t.user u
            WHERE u.id = :userId
            """)
    List<Long> getTopicIdsByUserId(@Param("userId") Long userId);

    @Transactional
    @Modifying
    @Query(value = """
               DELETE FROM Topic t
               WHERE t.id IN :topicIds
            """)
    void deleteTopicsByUserId(@Param("topicIds") List<Long> topicIds);
}
