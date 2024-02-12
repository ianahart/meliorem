package com.hart.meliorem.topic;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.topic.request.CreateTopicRequest;
import com.hart.meliorem.topic.response.CreateTopicResponse;
import com.hart.meliorem.topic.response.GetTopicResponse;

@RestController
@RequestMapping(path = "/api/v1/topics")
public class TopicController {

    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping("")
    ResponseEntity<GetTopicResponse> getTopics() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetTopicResponse("success", this.topicService.getTopics()));
    }

    @PostMapping("")
    ResponseEntity<CreateTopicResponse> createTopic(@RequestBody CreateTopicRequest request) {

        this.topicService.createTopic(request.getTopics());
        return ResponseEntity.status(HttpStatus.CREATED).body(new CreateTopicResponse("success"));
    }

}
