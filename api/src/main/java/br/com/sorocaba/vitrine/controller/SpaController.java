package br.com.sorocaba.vitrine.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Controller responsible for forwarding SPA routes to the bundled React application.
 */
@Controller
public class SpaController {

    @RequestMapping({"/app", "/app/", "/app/{path:[^\\.]*}", "/app/**/{path:[^\\.]*}"})
    public String forwardSpa() {
        return "forward:/spa/index.html";
    }
}


