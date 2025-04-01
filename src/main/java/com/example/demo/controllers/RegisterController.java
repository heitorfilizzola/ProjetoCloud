package com.example.demo.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class RegisterController {


    @GetMapping("register")
    public ModelAndView showRegister() {
        ModelAndView mv = new ModelAndView("Register_Page/index.html");
        return mv;
    }

    @PostMapping("register")
    public ModelAndView register() {
        return new ModelAndView("redirect:/login");
    }
}





