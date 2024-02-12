package com.hart.meliorem.topic.request;

import java.util.List;

public class CreateTopicRequest {

    private List<String> topics;

    public CreateTopicRequest() {

    }

    public CreateTopicRequest(List<String> topics) {
        this.topics = topics;
    }

    public List<String> getTopics() {
        return topics;
    }

    public void setTopics(List<String> topics) {
        this.topics = topics;
    }
}
