package com.hart.meliorem.topic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hart.meliorem.topic.dto.TopicDto;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;

@Service
public class TopicService {

    private final TopicRepository topicRepository;

    private final UserService userService;

    @Autowired
    public TopicService(
            TopicRepository topicRepository,
            UserService userService) {
        this.topicRepository = topicRepository;
        this.userService = userService;
    }

    @Transactional
    private void deletePrevTopics(List<Long> topicIds) {
        this.topicRepository.deleteTopicsByUserId(topicIds);
    }

    public void createTopic(List<String> topics) {
        User user = this.userService.getCurrentlyLoggedInUser();

        List<Long> previousTopicIds = this.topicRepository.getTopicIdsByUserId(user.getId());

        deletePrevTopics(previousTopicIds);

        for (String topic : topics) {
            this.topicRepository.save(new Topic(topic, user));
        }

    }

    public List<TopicDto> getTopics() {
        User user = this.userService.getCurrentlyLoggedInUser();

        return this.topicRepository.getTopicsByUserId(user.getId());
    }
}
