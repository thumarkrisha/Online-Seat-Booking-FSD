package com.example.SeatBooking.controller;

import com.example.SeatBooking.entity.User;
import com.example.SeatBooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        User auth = userRepository.findByUsername(user.getUsername());
        if (auth != null && auth.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok("authenticated");
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }


    @PatchMapping("/userdata/{username}")
    public ResponseEntity<String> updateUsername(@PathVariable String username, @RequestBody String newUsername){
        try{
            System.out.println(newUsername);
            User user = userRepository.findByUsername(username);
            if (user != null) {
                user.setUsername(newUsername);
                userRepository.save(user);
                return ResponseEntity.ok("Username updated");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch(Exception ex){
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Update operation failed");
        }
    }

}
