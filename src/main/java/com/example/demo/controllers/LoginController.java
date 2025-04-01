package com.example.demo.controllers;



import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {


    @GetMapping("login")
    public ModelAndView showLogin() {

        ModelAndView mv = new ModelAndView("Login_Page/index.html");
        return mv;
    }

    @PostMapping("login")
    public ModelAndView login() {

        return new ModelAndView("redirect:/tasks");
    }
}
