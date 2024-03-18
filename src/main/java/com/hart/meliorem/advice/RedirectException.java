package com.hart.meliorem.advice;

public class RedirectException extends RuntimeException {

    public RedirectException(String message) {
        super(message);
    }
}
