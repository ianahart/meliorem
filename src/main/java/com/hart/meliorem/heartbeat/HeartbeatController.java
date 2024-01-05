package com.hart.meliorem.heartbeat;

import com.hart.meliorem.heartbeat.response.HeartbeatResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/heartbeat")
public class HeartbeatController {

    @GetMapping
    ResponseEntity<HeartbeatResponse> getHeartbeat() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new HeartbeatResponse("heartbeat success"));
    }
}
