package br.com.sorocaba.vitrine.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Controller for the main Portal page
 * Handles the landing page with links to Shop, Blog, and Admin
 */
@Controller
@RequestMapping("/")
public class PortalController {

    @GetMapping
    public String index(Model model) {
        model.addAttribute("title", "VitrineSorocabana — Portal");
        model.addAttribute("pageTitle", "Bem-vindo à VitrineSorocabana");
        model.addAttribute("pageDescription", "Escolha um dos módulos abaixo. Tudo na mesma URL base, em subpastas.");
        return "portal/index";
    }
    
    @GetMapping("/portal")
    public String portal(Model model) {
        return index(model);
    }
}

