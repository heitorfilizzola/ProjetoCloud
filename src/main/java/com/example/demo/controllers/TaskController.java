package com.example.demo.controllers;



import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequestMapping("/tasks")
public class TaskController {

    @GetMapping
    public ModelAndView mainPage() {
        ModelAndView mv = new ModelAndView("index.html");
        return mv;
    }

    @GetMapping("/new")
    public ModelAndView newTask() {
        ModelAndView mv = new ModelAndView("newTask.html");
        return mv;
    }

    @PostMapping
    public ModelAndView saveTask() {
        return new ModelAndView("redirect:/tasks");
    }

    @GetMapping("/edit/")
    public ModelAndView editTask() {

        ModelAndView mv = new ModelAndView("/Edit_Page/index");
        return mv;
    }

    @PostMapping("/edit")
    public ModelAndView updateTask() {

        return new ModelAndView("redirect:/tasks");
    }

}