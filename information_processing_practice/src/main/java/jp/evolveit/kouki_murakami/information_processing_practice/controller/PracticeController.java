package jp.evolveit.kouki_murakami.information_processing_practice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PracticeController {
    @RequestMapping("/hello")
    public ModelAndView hello(ModelAndView mav) {
        mav.setViewName("hello");
        return mav;
    }
}
