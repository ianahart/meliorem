package com.hart.meliorem.timeslot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.timeslot.request.UpdateTimeSlotRequest;
import com.hart.meliorem.timeslot.response.GetTimeSlotResponse;
import com.hart.meliorem.timeslot.response.UpdateTimeSlotResponse;

@RestController
@RequestMapping(path = "/api/v1/time-slots")
public class TimeSlotController {

    private final TimeSlotService timeSlotService;

    @Autowired
    public TimeSlotController(TimeSlotService timeSlotService) {
        this.timeSlotService = timeSlotService;
    }

    @GetMapping("")
    ResponseEntity<GetTimeSlotResponse> getTimeSlots() {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetTimeSlotResponse("success", this.timeSlotService.getTimeSlots()));
    }


    @PatchMapping("/{timeSlotId}")
    ResponseEntity<UpdateTimeSlotResponse> updateTimeSlot(@PathVariable("timeSlotId") Long timeSlotId, @RequestBody UpdateTimeSlotRequest request) {

         this.timeSlotService.updateTimeSlot(timeSlotId, request.getDay());

         return ResponseEntity.status(HttpStatus.OK).body(new UpdateTimeSlotResponse("success"));
    }
}
