package com.example.demo.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;



@Controller
public class ForgotPasswordController {

    @GetMapping("/forgotpassword")
    public ModelAndView showForgotPasswordPage() {
        ModelAndView mv = new ModelAndView("ForgotPassword_Page/index");
        return mv;
    }

    @PostMapping("forgotpassword")
    public ModelAndView processForgotPassword() {
        ModelAndView mv = new ModelAndView("ForgotPassword_Page/index");


            mv.addObject("error", "E-mail não encontrado!");
            return mv;
//
//
//        mv.addObject("message", "Um link de recuperação foi enviado para o seu e-mail.");
//        return mv;
    }
}